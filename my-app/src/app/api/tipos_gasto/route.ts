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

export async function GET(req: Request) {//listar tipos de gasto
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "ID do usuário não fornecido" }, { status: 400 });
  }

  try {
    const tiposGasto = db
      .prepare("SELECT id , name_tipo_gasto FROM tipos_gasto WHERE id_usuario = ?")
      .all(userId);

    if (tiposGasto.length === 0) {
      return NextResponse.json({ message: "Nenhum tipo de gasto encontrado." });
    }

    return NextResponse.json(tiposGasto);
  } catch (error: any) {
    console.error("Erro ao buscar tipos de gasto:", error.message);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
// deleta o tipo
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const gastoId = params.id;

  if (!gastoId) {
    return NextResponse.json({ error: "ID do tipo de gasto não fornecido" }, { status: 400 });
  }

  try {
    // Verifica se o tipo de gasto existe
    const tipoGasto = db.prepare("SELECT * FROM tipos_gasto WHERE id = ?").get(gastoId);

    if (!tipoGasto) {
      return NextResponse.json({ error: "Tipo de gasto não encontrado" }, { status: 404 });
    }

    // Exclui o tipo de gasto
    db.prepare("DELETE FROM tipos_gasto WHERE id = ?").run(gastoId);

    return NextResponse.json({ message: "Tipo de gasto excluído com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao excluir tipo de gasto:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Erro desconhecido:", error);
      return NextResponse.json({ error: "Erro desconhecido." }, { status: 500 });
    }
  }
}
