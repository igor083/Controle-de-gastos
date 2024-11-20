import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name_tipo_gasto, id_usuario } = await req.json();

    // Verificar se os campos necessários estão presentes
    if (!name_tipo_gasto || !id_usuario) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verificar se o usuário existe na tabela 'usuarios'
    const user = db.prepare("SELECT * FROM usuarios WHERE id = ?").get(id_usuario);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Inserir o tipo de gasto
    const result = db
      .prepare("INSERT INTO tipos_gasto (name_tipo_gasto, id_usuario) VALUES (?, ?)")
      .run(name_tipo_gasto, id_usuario);

    return NextResponse.json({
      id_tipo_gasto: result.lastInsertRowid,
      name_tipo_gasto,
      id_usuario,
    });
  } catch (error: any) {
    console.error("Database error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
