import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const KEY = 'ynb:legal-info';
const SECRET = process.env.LEGAL_INFO_SECRET || 'ynb-legal-secret-2026';

async function getClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

// 목록 조회 (공개)
export async function GET() {
  const client = await getClient();
  let posts: unknown[] = [];
  try {
    const raw = await client.lRange(KEY, 0, -1);
    posts = raw.map((r) => JSON.parse(r));
  } finally {
    await client.quit();
  }
  return NextResponse.json(posts);
}

// 특정 id 또는 keyword로 글 삭제 (secret 필요)
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const client = await getClient();
  try {
    const raw = await client.lRange(KEY, 0, -1);
    const all = raw.map((r) => JSON.parse(r));
    const keep = all.filter((p) =>
      body.id ? p.id !== body.id : body.keyword ? p.keyword !== body.keyword : true
    );
    await client.del(KEY);
    for (let i = keep.length - 1; i >= 0; i--) {
      await client.lPush(KEY, JSON.stringify(keep[i]));
    }
    return NextResponse.json({ ok: true, deleted: all.length - keep.length });
  } finally {
    await client.quit();
  }
}

// 글 수정 (secret 필요)
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!body.id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  const client = await getClient();
  try {
    const raw = await client.lRange(KEY, 0, -1);
    const all = raw.map((r) => JSON.parse(r));
    const idx = all.findIndex((p) => p.id === body.id);
    if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 });

    all[idx] = {
      ...all[idx],
      ...(body.title !== undefined && { title: body.title }),
      ...(body.keyword !== undefined && { keyword: body.keyword }),
      ...(body.content !== undefined && { content: body.content }),
    };

    await client.del(KEY);
    for (let i = all.length - 1; i >= 0; i--) {
      await client.lPush(KEY, JSON.stringify(all[i]));
    }
    return NextResponse.json({ ok: true });
  } finally {
    await client.quit();
  }
}

// 새 글 등록 (n8n 자동화가 호출, secret 필요)
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const entry = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    keyword: body.keyword || '',
    title: body.title || '',
    content: body.content || '',
    image: body.image || '', // base64 data URL (예: data:image/png;base64,...) 또는 외부 이미지 URL
  };

  const client = await getClient();
  try {
    await client.lPush(KEY, JSON.stringify(entry));
  } finally {
    await client.quit();
  }

  return NextResponse.json({ ok: true, id: entry.id });
}
