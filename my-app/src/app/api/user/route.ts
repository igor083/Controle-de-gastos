import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "ID do usuário não fornecido" }, { status: 400 });
  }

  try {
    const user = db.prepare("SELECT id, name, email FROM usuarios WHERE id = ?").get(userId);

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
