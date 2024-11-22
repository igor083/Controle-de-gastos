import { NextResponse } from "next/server";
import db from "@/lib/db";

// Define o tipo esperado para um gasto
interface Gasto {
  valor: number;
  id_usuario: number;
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const gastoId = params.id;

  if (!gastoId || isNaN(Number(gastoId))) {
    return NextResponse.json({ error: "ID do gasto não fornecido ou inválido" }, { status: 400 });
  }

  try {
    // Inicia uma transação para garantir a integridade dos dados
    db.prepare("BEGIN").run();

    // 1. Busca o gasto pelo ID para obter o valor e o ID do usuário
    const gasto = db.prepare("SELECT valor, id_usuario FROM gastos WHERE id = ?").get(gastoId) as Gasto;

    if (!gasto) {
      db.prepare("ROLLBACK").run();
      return NextResponse.json({ error: "Gasto não encontrado" }, { status: 404 });
    }

    const { valor, id_usuario } = gasto;

    // 2. Remove o gasto da tabela de gastos
    db.prepare("DELETE FROM gastos WHERE id = ?").run(gastoId);

    // 3. Atualiza o valor da banca do usuário, adicionando o valor do gasto de volta
    db.prepare("UPDATE usuarios SET banca = banca + ? WHERE id = ?").run(valor, id_usuario);

    // Finaliza a transação
    db.prepare("COMMIT").run();

    return NextResponse.json({ message: "Gasto excluído com sucesso!" }, { status: 200 });
  } catch (error) {
    // Faz o rollback da transação em caso de erro
    db.prepare("ROLLBACK").run();
    console.error("Erro ao excluir o gasto:", error);
    return NextResponse.json({ error: "Erro ao excluir o gasto" }, { status: 500 });
  }
}
