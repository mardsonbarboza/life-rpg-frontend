import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware simplificado - a autenticação é controlada pelo AuthContext
  // que verifica o token no localStorage (client-side)
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
