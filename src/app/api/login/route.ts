import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      );
    }

    const loginPassword = process.env.LOGIN_PASSWORD;

    // Allow access if no password is configured (setup mode)
    if (!loginPassword || password === loginPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
      });

      response.cookies.set('session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { message: 'Invalid password' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Invalid request' },
      { status: 400 }
    );
  }
}
