import { NextResponse } from 'next/server';
import { indexEntries } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    data: indexEntries,
    _links: {
      self: '/api/categories',
      auth: '/api/auth',
      docs: '/api/index',
    },
  });
}
