import { NextResponse } from "next/server";
import db from "@/lib/db";

//--------------------------- Registro de Gasto ------------------------------
export async function POST(req: Request) {
  const { valor, data, descricao, id_tipo_gasto, id_usuario } = await req.json();

  if (!valor || !data || !descricao || !id_tipo_gasto || !id_usuario) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // Inicia uma transação para garantir a integridade dos dados
    db.prepare("BEGIN").run();

    // 1. Adiciona o gasto na tabela de gastos
    const result = db
      .prepare(
        "INSERT INTO gastos (valor, data, descricao, id_tipo_gasto, id_usuario) VALUES (?, ?, ?, ?, ?)"
      )
      .run(valor, data, descricao, id_tipo_gasto, id_usuario);

    // 2. Atualiza o valor da banca do usuário, subtraindo o valor do gasto
    db.prepare(
      "UPDATE usuarios SET banca = banca - ? WHERE id = ?"
    ).run(valor, id_usuario);

    // Finaliza a transação
    db.prepare("COMMIT").run();

    return NextResponse.json({
      id_gasto: result.lastInsertRowid,
      valor,
      data,
      descricao,
      id_tipo_gasto,
      id_usuario,
    });
  } catch (error) {
    // Se algo der errado, faz o rollback da transação
    db.prepare("ROLLBACK").run();
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

//--------------------------- Listar Gastos do Usuário ------------------------------

export async function GET(req: Request) {
  // Obtendo o parâmetro id_usuario da URL (query string)
  const url = new URL(req.url);
  const userId = url.searchParams.get("id_usuario");

  // Verifica se o ID do usuário foi fornecido
  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  try {
    // Busca os gastos do usuário no banco de dados
    const gastos = db
      .prepare("SELECT * FROM gastos WHERE id_usuario = ?")
      .all(Number(userId)); // Converte o userId para número

    // Retorna uma mensagem apropriada caso o usuário não tenha gastos
    if (gastos.length === 0) {
      return NextResponse.json({ message: "No expenses found for this user." });
    }

    // Retorna os gastos se encontrados
    return NextResponse.json(gastos);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
