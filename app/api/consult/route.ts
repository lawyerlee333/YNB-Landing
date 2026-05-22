import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FILE = path.join('/tmp', 'ynb-consults.json');

async function readConsults() {
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const consults = await readConsults();
  const entry = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    name: body.name || '',
    phone: body.phone || '',
    area: body.area || '',
    content: body.content || '',
  };
  consults.unshift(entry);
  await fs.writeFile(FILE, JSON.stringify(consults, null, 2), 'utf-8');
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw');
  if (pw !== process.env.ADMIN_PW && pw !== 'ynb1234') {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const consults = await readConsults();
  return NextResponse.json(consults);
}
