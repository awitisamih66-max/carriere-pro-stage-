import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
  // La sécurité est gérée côté client dans app/admin/layout.tsx
  // Ce proxy est prêt pour des extensions futures.
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
