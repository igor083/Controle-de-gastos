import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Função para verificar se o usuário está autenticado
export function middleware(req: NextRequest) {
  // Checar se o cookie de sessão existe
  const sessionCookie = req.cookies.get('session');

  // Se não tiver cookie ou o cookie for inválido, redireciona para a página de login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Aqui você pode adicionar uma verificação adicional, como validar o token JWT
  // Se estiver usando JWT, você pode verificar o cookie ou o cabeçalho 'Authorization'

  // Se o cookie de sessão existir, a requisição segue para o próximo estágio
  return NextResponse.next();
}

// Definir as rotas protegidas pelo middleware (e.g., qualquer URL de usuário)
export const config = {
  matcher: ['/user/:path*'], // Protege todas as rotas que começam com '/user'
};
