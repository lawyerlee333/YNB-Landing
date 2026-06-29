// app/api/legal-info/generate/route.ts
//
// 매일 1회 자동 실행되는 법률정보 콘텐츠 생성 라우트.
// Vercel Cron이 이 GET 엔드포인트를 호출하면:
//   1) Redis에 저장된 "최근 사용 주제" 목록을 가져와 중복을 피하고
//   2) Gemini로 새 주제 + 본문을 생성하고
//   3) Gemini(나노바나나, gemini-2.5-flash-image)로 본문에 어울리는 이미지를 생성하고
//   4) 이미지를 Vercel Blob에 업로드해 진짜 URL을 받고
//   5) 기존 legal-info 저장 로직(/api/legal-info POST)을 그대로 재사용해 글을 등록한다.
//
// 실패 지점(특히 이미지 생성)에서 절대 깨진 값을 그대로 저장하지 않는 것이 핵심.
// 이미지 생성이 실패하면 이미지 없이라도 글은 등록하고, 에러를 로그로 남긴다.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';
import { put } from '@vercel/blob';

const TOPIC_HISTORY_KEY = 'ynb:legal-info:recent-topics';
const TOPIC_HISTORY_MAX = 30;
const CRON_SECRET = process.env.CRON_SECRET;
const LEGAL_INFO_SECRET = process.env.LEGAL_INFO_SECRET || 'ynb-legal-secret-2026';
const SITE_URL = process.env.SITE_URL || 'https://www.ynblaw.co.kr';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getRedisClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

async function getRecentTopics(): Promise<string[]> {
  const client = await getRedisClient();
  try {
    return await client.lRange(TOPIC_HISTORY_KEY, 0, TOPIC_HISTORY_MAX - 1);
  } finally {
    await client.quit();
  }
}

async function recordTopic(topic: string) {
  const client = await getRedisClient();
  try {
    await client.lPush(TOPIC_HISTORY_KEY, topic);
    await client.lTrim(TOPIC_HISTORY_KEY, 0, TOPIC_HISTORY_MAX - 1);
  } finally {
    await client.quit();
  }
}

async function generateArticle(recentTopics: string[]) {
  const avoidList = recentTopics.length
    ? `다음 주제들은 최근에 이미 다뤘으니 절대 반복하지 말고, 완전히 다른 주제를 선택해줘:\n- ${recentTopics.join('\n- ')}`
    : '아직 작성된 글이 없으니 자유롭게 주제를 선택해줘.';

  const prompt = `너는 전주 소재 교통사고/형사전문 법무법인 와이앤비(Y&B)의 법률 콘텐츠 작가야.
매일 새로운 법률 이슈/실무 정보를 다루는 블로그 글을 1개 작성해야 해.

${avoidList}

조건:
- 일반인이 이해하기 쉬운 실무 중심 글
- 교통사고, 형사, 손해배상, 형사절차 등 우리 로펌 전문 분야 위주
- 분량: 800~1200자
- 반드시 아래 JSON 형식으로만 응답 (다른 텍스트, 마크다운 코드블록 없이 순수 JSON만):
{
  "keyword": "글의 핵심 키워드 한 단어 (예: 사기, 공탁금, 음주운전)",
  "title": "글 제목",
  "content": "본문 전체 (줄바꿈은 \\n으로)",
  "image_prompt": "이 글과 어울리는 이미지를 그리기 위한 영어 프롬프트 (실사풍, 텍스트 없이, 법률/사무실/법정 관련 분위기)"
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini 텍스트 생성 실패: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Gemini 응답 JSON 파싱 실패: ${rawText.slice(0, 200)}`);
  }

  return parsed as { keyword: string; title: string; content: string; image_prompt: string };
}

async function generateImageBase64(imagePrompt: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: imagePrompt }] }] }),
      }
    );

    if (!res.ok) {
      console.error('나노바나나 이미지 생성 실패:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p: any) => p.inlineData?.data);

    if (!imagePart) {
      console.error('나노바나나 응답에 이미지 데이터 없음:', JSON.stringify(data).slice(0, 300));
      return null;
    }

    return imagePart.inlineData.data as string;
  } catch (err) {
    console.error('나노바나나 이미지 생성 중 예외:', err);
    return null;
  }
}

async function uploadImageToBlob(base64: string, keyword: string): Promise<string | null> {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const filename = `legal-info/${Date.now()}-${encodeURIComponent(keyword)}.png`;
    const blob = await put(filename, buffer, { access: 'public', contentType: 'image/png' });
    return blob.url;
  } catch (err) {
    console.error('Blob 업로드 실패:', err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다' }, { status: 500 });
  }

  try {
    const recentTopics = await getRecentTopics();

    let article = await generateArticle(recentTopics);
    if (recentTopics.includes(article.keyword)) {
      article = await generateArticle(recentTopics);
    }

    let imageUrl = '';
    const base64Image = await generateImageBase64(article.image_prompt);
    if (base64Image) {
      const uploadedUrl = await uploadImageToBlob(base64Image, article.keyword);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const saveRes = await fetch(`${SITE_URL}/api/legal-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: LEGAL_INFO_SECRET,
        keyword: article.keyword,
        title: article.title,
        content: article.content,
        image: imageUrl,
      }),
    });

    if (!saveRes.ok) {
      throw new Error(`글 저장 실패: ${saveRes.status} ${await saveRes.text()}`);
    }

    await recordTopic(article.keyword);

    return NextResponse.json({
      ok: true,
      keyword: article.keyword,
      title: article.title,
      imageGenerated: !!imageUrl,
    });
  } catch (err: any) {
    console.error('legal-info 자동 생성 실패:', err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
