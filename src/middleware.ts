import { NextRequest, NextResponse } from 'next/server';

/**
 * CORS configuration.
 * Customize via environment variables:
 *   - CORS_ORIGIN: Comma-separated list of allowed origins (default: '*')
 *   - CORS_METHODS:  Comma-separated allowed methods (default: 'GET,POST,OPTIONS')
 *   - CORS_HEADERS:  Comma-separated allowed headers (default: 'Content-Type,Authorization,X-API-Key')
 */
function getCorsConfig() {
  return {
    allowedOrigins: ('*').split(',').map(s => s.trim()),
    allowedMethods: ('GET,POST,OPTIONS').split(',').map(s => s.trim()),
    allowedHeaders: ('Content-Type,Authorization,X-API-Key').split(',').map(s => s.trim()),
  };
}

/**
 * Determine the appropriate Access-Control-Allow-Origin value.
 * - If '*' is in allowedOrigins, mirror the request origin when credentials are needed,
 *   otherwise return '*'.
 * - Otherwise, return the request origin if it's in the allowed list.
 */
function resolveOrigin(request: NextRequest, config: ReturnType<typeof getCorsConfig>): string | null {
  const requestOrigin = request.headers.get('origin');

  if (config.allowedOrigins.includes('*')) {
    // For cookie-based auth routes, we must echo the origin (cannot use '*' with credentials)
    const pathname = request.nextUrl.pathname;
    const needsCredentials = pathname.startsWith('/api/login') || pathname.startsWith('/api/logout');
    if (needsCredentials && requestOrigin) {
      return requestOrigin;
    }
    return '*';
  }

  if (requestOrigin && config.allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return null;
}

export function middleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const config = getCorsConfig();
  const origin = resolveOrigin(request, config);

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    const preflightHeaders: Record<string, string> = {
      'Access-Control-Allow-Methods': config.allowedMethods.join(', '),
      'Access-Control-Allow-Headers': config.allowedHeaders.join(', '),
      'Access-Control-Max-Age': '86400', // 24 hours
    };

    if (origin) {
      preflightHeaders['Access-Control-Allow-Origin'] = origin;
    }

    return new NextResponse(null, {
      status: 204,
      headers: preflightHeaders,
    });
  }

  // For normal requests, add CORS headers to the response
  const response = NextResponse.next();

  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  // Allow credentials for cookie-based auth routes
  if (origin && (request.nextUrl.pathname.startsWith('/api/login') || request.nextUrl.pathname.startsWith('/api/logout'))) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
