import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { valor, descricao, id_usuario, data } = await req.json();
    console.log("Dados recebidos:", valor, descricao, id_usuario, data);
  
    if (!valor || valor <= 0 || !descricao || !id_usuario) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios e válidos." },
        { status: 400 }
      );
    }

    // Usar data atual, se não for fornecida
    const dataAtual = data || new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    // Atualizar o saldo da banca na tabela usuarios
    const update = db.prepare(`
      UPDATE usuarios
      SET banca = banca + ? 
      WHERE id = ?  -- Atualiza a banca com base no id do usuário
    `).run(valor, id_usuario);

    if (update.changes === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado ou saldo não atualizado." },
        { status: 400 }
      );
    }

    // Logar a transação na tabela de histórico (gastos)
    db.prepare(`
      INSERT INTO gastos (valor, data , descricao, id_usuario) 
      VALUES (?, ?, ?, ?)  -- Insere a transação na tabela gastos com id_usuario
    `).run(valor, dataAtual, descricao, id_usuario);

    return NextResponse.json({ message: "Dinheiro adicionado com sucesso." });
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    return NextResponse.json({ error: "Erro no servidor." }, { status: 500 });
  }
}
