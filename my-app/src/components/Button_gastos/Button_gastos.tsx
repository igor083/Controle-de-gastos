"use client";

import { useState } from "react";

export default function Button_gastos({ userId }: { userId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameTipoGasto, setNameTipoGasto] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Função para enviar os dados para a API
  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");
    postMessage("");

    if (!nameTipoGasto) {
      setError("Preencha o nome do tipo de gasto.");
      return;
    }

    try {
      const response = await fetch("/api/tipos_gasto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_tipo_gasto: nameTipoGasto,
          id_usuario: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Tipo de gasto criado com sucesso!");
        setNameTipoGasto("");
        setIsModalOpen(false); // Fecha o modal após sucesso
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao criar tipo de gasto.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao se conectar com o servidor.");
    }
  };

  return (
    <>
      {/* Botão que abre o pop-up */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width:"7rem",
          height:"3rem",
        }}
      >
        Criar Tipo de Gasto
      </button>

      {/* Modal */}
      {isModalOpen && (
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
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>Criar Tipo de Gasto</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Nome do Tipo de Gasto:
              </label>
              <input
                type="text"
                value={nameTipoGasto}
                onChange={(e) => setNameTipoGasto(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  marginRight: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width:"6rem"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width:"6rem"
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
