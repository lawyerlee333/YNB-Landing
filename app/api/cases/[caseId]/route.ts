// app/api/cases/[caseId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const KEY = 'ynb:cases';
const SECRET = process.env.CASES_SECRET || 'ynb-cases-secret-2026';

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const targetId = parseInt(caseId, 10);

  const client = await getClient();
  try {
    const raw = await client.lRange(KEY, 0, -1);
    const cases = raw.map((r) => JSON.parse(r));
    const found = cases.find((c: any) => c.caseId === targetId);
    if (!found) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json(found);
  } finally {
    await client.quit();
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const targetId = parseInt(caseId, 10);
  const body = await req.json();

  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const client = await getClient();
  try {
    const raw = await client.lRange(KEY, 0, -1);
    const idx = raw.findIndex((r) => JSON.parse(r).caseId === targetId);
    if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 });

    const existing = JSON.parse(raw[idx]);
    const updated = {
      ...existing,
      category: body.category ?? existing.category,
      caseType: body.caseType ?? existing.caseType,
      summary: body.summary ?? existing.summary,
      strategy: body.strategy ?? existing.strategy,
      result: body.result ?? existing.result,
      image: body.image ?? existing.image,
    };

    await client.lSet(KEY, idx, JSON.stringify(updated));
    return NextResponse.json({ ok: true, case: updated });
  } finally {
    await client.quit();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const targetId = parseInt(caseId, 10);
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret');

  if (secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const client = await getClient();
  try {
    const raw = await client.lRange(KEY, 0, -1);
    const target = raw.find((r) => JSON.parse(r).caseId === targetId);
    if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 });

    await client.lRem(KEY, 1, target);
    return NextResponse.json({ ok: true, deleted: targetId });
  } finally {
    await client.quit();
  }
}
