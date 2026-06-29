// app/api/cases/[caseId]/route.ts
//
// 특정 caseId 하나만 조회 (상세페이지에서 사용)

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const KEY = 'ynb:cases';

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { caseId: string } }
) {
  const targetId = parseInt(params.caseId, 10);

  const client = await getClient();
  try {
    const raw = await client.lRange(KEY, 0, -1);
    const cases = raw.map((r) => JSON.parse(r));
    const found = cases.find((c: any) => c.caseId === targetId);

    if (!found) {
      return NextResponse.json({ error: 'not found' }, { status: 404 });
    }

    return NextResponse.json(found);
  } finally {
    await client.quit();
  }
}
