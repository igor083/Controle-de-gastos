import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Checar se o cookie de sessão existe
  const sessionCookie = req.cookies.get('session');

  // Se não tiver cookie ou o cookie for inválido, redireciona para a página de login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Se o cookie de sessão existir, a requisição segue para o próximo estágio
  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*'], // Protege todas as rotas que começam com '/user'
};
