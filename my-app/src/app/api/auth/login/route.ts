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

    // Tipando explicitamente o retorno do banco de dados como `User | undefined`
    const user = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email) as User | undefined;

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", id: user.id });
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
