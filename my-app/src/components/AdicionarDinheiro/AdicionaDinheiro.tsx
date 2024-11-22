"use client";

import React, { useState } from "react";

export default function AdicionaDinheiro({ userId }: { userId: number }) {
  const [valor, setValor] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [data, setData] = useState<string>(""); // Adicionada a variável de estado para a data
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");

    // Validação de campos
    console.log(typeof(valor),descricao,data)
    if (typeof(valor)!=="number" ||valor <= 0 || !descricao || !data) {
      setError("Todos os campos devem ser preenchidos corretamente.");
      return;
    }

    try {
      const response = await fetch("/api/adiciona_dinheiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valor,  
          descricao,
          data,
          id_usuario: userId,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Valor adicionado com sucesso!");
       
        setDescricao("");
        setData("");
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao adicionar o valor.");
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
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "7px",
          cursor: "pointer",
          width:"8rem",
          height:"3rem",
        }}
      >
        Adicionar Dinheiro
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
            <h2>Adicionar Dinheiro</h2>

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
                  padding: "10px 20px",
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
