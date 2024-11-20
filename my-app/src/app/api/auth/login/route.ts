import { NextResponse } from "next/server";
import db from "@/lib/db";

interface User {
  id: number;
  name: string;
  email: string;
  password
  : string;
}

export async function POST(req: Request) {
  const { email, password

   } = await req.json();

  if (!email || !password

  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // Consulta no banco de dados
    const user = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email) as User | undefined;

    // Verifica se o usuário existe e se a password está correta
    if (!user || user.password
         !== password

    ) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("session", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
