// app/api/cases/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const SECRET = process.env.CASES_SECRET || 'ynb-cases-secret-2026';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!body.imageBase64) {
    return NextResponse.json({ error: '이미지 데이터가 없습니다' }, { status: 400 });
  }

  try {
    const base64 = body.imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    const filename = `cases/${Date.now()}.png`;
    const blob = await put(filename, buffer, { access: 'public', contentType: 'image/png' });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err: any) {
    console.error('이미지 업로드 실패:', err);
    return NextResponse.json({ error: err.message || '업로드 실패' }, { status: 500 });
  }
}
