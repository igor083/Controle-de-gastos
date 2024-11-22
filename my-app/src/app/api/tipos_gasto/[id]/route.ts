import db from "@/lib/db";
import { NextResponse } from "next/server";

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