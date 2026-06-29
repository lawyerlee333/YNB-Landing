// app/api/cases/route.ts
//
// 성공사례 저장/조회 API.
// GET: 전체 목록 조회 (공개)
// POST: 새 사례 등록 (secret 필요, 관리자 폼에서 호출)

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const KEY = 'ynb:cases';
const ID_COUNTER_KEY = 'ynb:cases:next-id';
const SECRET = process.env.CASES_SECRET || 'ynb-cases-secret-2026';
const START_ID = 866;

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function GET() {
  const client = await getClient();
  let cases: unknown[] = [];
  try {
    const raw = await client.lRange(KEY, 0, -1);
    cases = raw.map((r) => JSON.parse(r));
  } finally {
    await client.quit();
  }
  return NextResponse.json(cases);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const client = await getClient();
  try {
    let nextId = await client.get(ID_COUNTER_KEY);
    let caseId: number;
    if (!nextId) {
      caseId = START_ID;
    } else {
      caseId = parseInt(nextId, 10);
    }

    const entry = {
      id: Date.now(),
      caseId,
      createdAt: new Date().toISOString(),
      caseType: body.caseType || '',
      summary: body.summary || '',
      strategy: body.strategy || '',
      result: body.result || '',
      image: body.image || '',
    };

    await client.lPush(KEY, JSON.stringify(entry));
    await client.set(ID_COUNTER_KEY, String(caseId + 1));

    return NextResponse.json({ ok: true, caseId: entry.caseId });
  } finally {
    await client.quit();
  }
}
