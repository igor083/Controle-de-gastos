import { NextResponse } from "next/server";
import db from "@/lib/db";
//---------------------------               registro de gasto          ------------------------------ 
export async function POST(req: Request) {
  const { valor, data, descricao, id_tipo_gasto, id_usuario } = await req.json();

  if (!valor || !data || !descricao || !id_tipo_gasto || !id_usuario) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const result = db
      .prepare(
        "INSERT INTO gastos (valor, data, descricao, id_tipo_gasto, id_usuario) VALUES (?, ?, ?, ?, ?)"
      )
      .run(valor, data, descricao, id_tipo_gasto, id_usuario);

    return NextResponse.json({
      id_gasto: result.lastInsertRowid,
      valor,
      data,
      descricao,
      id_tipo_gasto,
      id_usuario,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
//---------------------------               listar gastos de user          ------------------------------ 
export async function GET(req: Request) {
    const userId = req.headers.get("id_usuario");
  
    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }
  
    try {
      const gastos = db
        .prepare("SELECT * FROM gastos WHERE id_usuario = ?")
        .all(Number(userId));
  
      return NextResponse.json(gastos);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }
  