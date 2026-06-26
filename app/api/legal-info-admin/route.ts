import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const KEY = 'ynb:legal-info';
const SECRET = process.env.LEGAL_INFO_SECRET || 'ynb-legal-secret-2026';

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const client = await getClient();
  try {
    const count = await client.lLen(KEY);
    await client.del(KEY);
    return NextResponse.json({ ok: true, removed: count });
  } finally {
    await client.quit();
  }
}
