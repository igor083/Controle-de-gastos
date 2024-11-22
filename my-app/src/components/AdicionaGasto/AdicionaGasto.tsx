"use client";

import React, { useState, useEffect } from "react";

export default function AdicionaDinheiro({ userId }: { userId: number }) {
  const [valor, setValor] = useState<number | "">("");
  const [data, setData] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [tiposGasto, setTiposGasto] = useState<
    { id: number; name_tipo_gasto: string }[]
  >([]);
  const [idTipoGasto, setIdTipoGasto] = useState<number | "">("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Carrega os tipos de gasto ao montar o componente
  useEffect(() => {
    const fetchTiposGasto = async () => {
      try {
        const response = await fetch(`/api/tipos_gasto?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
  
          // Validar se a resposta é um array
          if (Array.isArray(data)) {
            setTiposGasto(data);
          } else {
            console.error("Resposta inesperada da API:", data);
            setError("Erro ao carregar os tipos de gasto.");
          }
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Erro ao carregar os tipos de gasto.");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao conectar ao servidor.");
      }
    };
  
    fetchTiposGasto();
  }, [userId]);
  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");

    // Validação de campos
    if (!valor || !data || !descricao || !idTipoGasto) {
      setError("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const response = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valor,
          data,
          descricao,
          id_tipo_gasto: idTipoGasto,
          id_usuario: userId,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Gasto adicionado com sucesso!");
        setValor("");
        setData("");
        setDescricao("");
        setIdTipoGasto("");
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao adicionar o gasto.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 20px",
          width:"8rem",
          height:"3rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "7px",
          cursor: "pointer",
          background:"#4C0ECD"
        }}
      >
        Adicionar Gasto
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h1>Adicionar Gasto</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            <div style={{ marginBottom: "10px" }}>
              <label>Valor:</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Data:</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Descrição:</label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Tipo de Gasto:</label>
              <select
                value={idTipoGasto || ""}
                onChange={(e) => setIdTipoGasto(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="" disabled>
                  -- Se vazio, crie tipos de gasto no menu --
                </option>
                {tiposGasto.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.name_tipo_gasto}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Adicionar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "10px",
                  backgroundColor: "#d9534f",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
