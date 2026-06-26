import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const REDIS_KEY = 'ynb-consults';

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const entry = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    name: body.name || '',
    phone: body.phone || '',
    area: body.area || '',
    content: body.content || '',
  };
  const client = await getClient();
  try {
    await client.lPush(REDIS_KEY, JSON.stringify(entry));
  } finally {
    await client.disconnect();
  }
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw');
  if (pw !== process.env.ADMIN_PW && pw !== 'ynb1234') {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const client = await getClient();
  try {
    const items = await client.lRange(REDIS_KEY, 0, -1);
    const consults = items.map((item) => JSON.parse(item));
    return NextResponse.json(consults);
  } finally {
    await client.disconnect();
  }
}
