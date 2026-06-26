import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const REDIS_KEY = 'ynb:legal-info';
const SECRET = process.env.LEGAL_INFO_SECRET ?? 'ynb-legal-secret-2026';

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

// 가장 최근 글 1개만 남기고 나머지 삭제
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const client = await getClient();
  try {
    const total = await client.lLen(REDIS_KEY);
    await client.lTrim(REDIS_KEY, 0, 0); // 인덱스 0(최신) 1개만 유지
    return NextResponse.json({ ok: true, removed: total - 1 });
  } finally {
    await client.disconnect();
  }
}
