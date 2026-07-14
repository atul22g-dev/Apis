import { NextResponse } from 'next/server';
import { authConfig } from '@/lib/data';

export async function GET() {
  return NextResponse.json(authConfig);
}
