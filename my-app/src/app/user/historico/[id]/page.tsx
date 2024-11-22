"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";  // Alteração aqui para usar useParams
import Link from "next/link";
import Header from "@/components/Header/Header";

interface Transferencia {
  id_tipo_gasto: null;
  id: number;
  valor: number;
  descricao: string;
  data: string;
}

const HistoricoPage = () => {
  const { id } = useParams();  // Agora usamos useParams() para pegar o id da URL
  const [transferencias, setTransferencias] = useState<Transferencia[]>([]);
  const [dataInicial, setDataInicial] = useState<string>("");
  const [dataFinal, setDataFinal] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Verificando se o id foi obtido corretamente
  useEffect(() => {
    console.log("ID do usuário:", id);  // Adicione isso para depurar
    if (!id) {
      setError("ID do usuário inválido.");
      return;
    }
    fetchTransferencias();  // Carregar as transferências quando o id estiver disponível
  }, [id]);  // Sempre que o id mudar, recarregar as transferências

  const fetchTransferencias = async () => {
    try {
      if (!id) {
        setError("ID do usuário inválido.");
        return;
      }

      const url = `/api/historico/${id}`;  // Agora usamos o id para buscar as transferências
      console.log("Requisição para URL:", url);  // Verifique a URL da requisição

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Erro ao buscar transferências.");
      }
      const data = await response.json();
      setTransferencias(data);
    } catch (err) {
      setError("Erro ao carregar as transferências.");
    }
  };

  const handleFilter = async () => {
    try {
      if (!dataInicial || !dataFinal) {
        setError("Por favor, selecione as datas inicial e final.");
        return;
      }

      const url = `/api/historico/${id}?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Erro ao filtrar transferências.");
      }
      const data = await response.json();
      setTransferencias(data);
      setError("");  // Limpar o erro
    } catch (err) {
      setError("Erro ao aplicar o filtro.");
    }
  };

  return (  
    <div style={{ padding: "20px" }}>
        <Header userId={Number(id)}/>
      <h1>Histórico de Transferências</h1>
      <div>
        <label style={{ paddingRight: "4px" }}>Data Inicial:</label>
        <input 
          type="date"
          value={dataInicial}
          onChange={(e) => setDataInicial(e.target.value)}
        />
        <label style={{ paddingRight: "4px", paddingLeft: "3rem" }}>Data Final:</label>
        <input
          type="date"
          value={dataFinal}
          onChange={(e) => setDataFinal(e.target.value)}
        />
        <button onClick={handleFilter} style={{ marginLeft: "10px" }}>
          Filtrar
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Data</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Valor</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {transferencias.length > 0 ? (
            transferencias.map((transferencia) => (
              <tr key={transferencia.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {transferencia.data}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    // Lógica para alterar a cor do valor baseado em id_tipo_gasto
                    color: transferencia.id_tipo_gasto === null ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  R$ {transferencia.valor.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {transferencia.descricao}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                Nenhuma transferência encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Link href={`/user/${id}`}>Voltar para Home</Link>
    </div>
  );
  
}
export default HistoricoPage;
