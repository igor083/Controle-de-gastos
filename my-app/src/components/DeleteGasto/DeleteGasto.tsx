import React, { useState, useEffect } from "react";

export default function DeleteGasto({ userId }: { userId: number }) {
  const [gastos, setGastos] = useState<any[]>([]);  // Garantindo que 'gastos' é sempre um array
  const [selectedGastoId, setSelectedGastoId] = useState<number | "">("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Carrega os gastos do usuário ao montar o componente
  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await fetch(`/api/gastos?id_usuario=${userId}`);
        if (response.ok) {
          const data = await response.json();
          // Verifique se a resposta é realmente um array
          if (Array.isArray(data)) {
            setGastos(data);
          } else {
            setError("");
          }
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Erro ao carregar os gastos.");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao conectar ao servidor.");
      }
    };

    fetchGastos();
  }, [userId]);

  // Função para excluir o gasto selecionado
  const handleDelete = async () => {
    setError("");
    setSuccessMessage("");

    if (!selectedGastoId) {
      setError("Selecione um gasto para excluir.");
      return;
    }

    try {
      const response = await fetch(`/api/gastos/${selectedGastoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccessMessage("Gasto excluído com sucesso!");
        setGastos((prev) =>
          prev.filter((gasto) => gasto.id !== Number(selectedGastoId))
        );
        setSelectedGastoId("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao excluir o gasto.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div>
      <h2>Excluir Gasto</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <div style={{ marginBottom: "10px" }}>
        <p>Selecione o gasto para exclusão:</p>
        <select
          value={selectedGastoId || ""}
          onChange={(e) => setSelectedGastoId(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            
          }}
        >
          <option value="" disabled>
            -- Selecione --
          </option>
          {Array.isArray(gastos) && gastos.length > 0 ? (
            gastos.map((gasto) => (
              <option key={gasto.id} value={gasto.id}style={{
                fontSize:"1rem"
                
              }} >
                {`${gasto.descricao} - R$${gasto.valor} - ${gasto.data}`}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Nenhum gasto encontrado.
            </option>
          )}
        </select>
      </div>

      <button
        onClick={handleDelete}
        style={{
          padding: "10px 20px",
          backgroundColor: "#d9534f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width:"8rem",
          height:"3rem",
        }}
      >
        Excluir
      </button>
    </div>
  );
}
