import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const REDIS_KEY = 'ynb:legal-info';
const SECRET = process.env.LEGAL_INFO_SECRET ?? 'ynb-legal-secret-2026';

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function GET() {
  const client = await getClient();
  try {
    const items = await client.lRange(REDIS_KEY, 0, -1);
    const posts = items.map((item) => JSON.parse(item));
    return NextResponse.json(posts);
  } finally {
    await client.disconnect();
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const entry = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    keyword: body.keyword ?? '',
    title: body.title ?? '',
    content: body.content ?? '',
    imageUrl: body.imageUrl ?? '',
  };
  const client = await getClient();
  try {
    await client.lPush(REDIS_KEY, JSON.stringify(entry));
  } finally {
    await client.disconnect();
  }
  return NextResponse.json({ ok: true });
}
