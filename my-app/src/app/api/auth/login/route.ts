import { NextResponse } from "next/server";
import db from "@/lib/db";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verificando usuário no banco de dados
    const user = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email) as User | undefined;

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    // Gerar um token de sessão 
    const sessionToken = `${user.id}-${new Date().getTime()}`; 

    // Definir o cookie de sessão
    const response = NextResponse.json({ message: "Login successful", id: user.id });

    // Atualizando a configuração do cookie
    response.cookies.set('session', sessionToken, {
      httpOnly: true,  // Para proteger o cookie de ataques XSS
      secure: process.env.NODE_ENV === 'production',  // Somente em HTTPS em produção
      path: '/',  // Disponível em toda a aplicação
      maxAge: 60 * 60,  // Duração do cookie (1 hora)
      sameSite: 'strict',  // Alterado de "Strict" para "strict"
    });


    return response;

  } catch (error) {
    console.error("Erro interno do servidor:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
