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
    // Lendo os dados enviados na requisição
    const { name, email, password } = await req.json();

    // Verificando se todos os campos foram preenchidos
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verificando se o e-mail já está registrado no banco de dados
    const userExists = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email) as User | undefined;

    if (userExists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Inserindo o novo usuário no banco de dados
    const result = db.prepare("INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)").run(name, email, password);

    // Retornando o usuário criado
    return NextResponse.json({
      id: result.lastInsertRowid,
      name,
      email,
    });
  } catch (error: any) {
    console.error("Database error:", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
