import db from "@/lib/db";
import { NextResponse } from "next/server";

// API para buscar histórico
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const dataInicial = searchParams.get('dataInicial');
    const dataFinal = searchParams.get('dataFinal');
  
    // Validação
    if (!id) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório.' },
        { status: 400 }
      );
    }
  
    try {
      // Query SQL dinâmica com ou sem filtro
      let query = `SELECT * FROM gastos WHERE id_usuario = ?`;
      const queryParams: any[] = [id];
  
      if (dataInicial && dataFinal) {
        query += ` AND data BETWEEN ? AND ?`;
        queryParams.push(dataInicial, dataFinal);
      }
  
      const transferencias = db.prepare(query).all(...queryParams);
      return NextResponse.json(transferencias);
    } catch (error) {
      console.error('Erro ao buscar transferências:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar transferências.' },
        { status: 500 }
      );
    }
  }
  