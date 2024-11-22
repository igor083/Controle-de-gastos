"use client";
import './style.scss';
import { useState, useEffect } from "react";

export default function DeleteTipoGasto({ userId }: { userId: number }) {
  const [tiposGasto, setTiposGasto] = useState<{ id: number; name_tipo_gasto: string }[]>([]);
  const [selectedGastoId, setSelectedGastoId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchTiposGasto = async () => {
    try {
      const response = await fetch(`/api/tipos_gasto?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setTiposGasto([]); // Caso a mensagem de nenhum dado seja recebida
        } else {
          setTiposGasto(data);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao carregar os tipos de gasto.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao se conectar com o servidor.");
    }
  };

  // Carregar os tipos de gasto do usuário ao montar o componente
  useEffect(() => {
    fetchTiposGasto();
  }, [userId]);

  // Função para excluir o tipo de gasto selecionado
  const handleDelete = async () => {
    if (!selectedGastoId) {
      setError("Selecione um tipo de gasto para excluir.");
      return;
    }

    try {
      const response = await fetch(`/api/tipos_gasto/${selectedGastoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Tipo de gasto excluído com sucesso!"); // Alterado para exibir mensagem como alert
        setTiposGasto((prev) => prev.filter((gasto) => gasto.id !== selectedGastoId));
        setSelectedGastoId(null); // Reseta a seleção após excluir
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao excluir o tipo de gasto.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao se conectar com o servidor.");
    }
  };

  return (
    <div>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <select
          value={selectedGastoId || ""}
          onChange={(e) => setSelectedGastoId(Number(e.target.value))}
          style={{
            width:"100%",
            
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        >
          <option value="" disabled style={{
                fontSize:"1rem"
              }}>
            -- Selecione --
          </option>
          {tiposGasto.map((gasto) => (
            <option key={gasto.id} value={gasto.id} style={{
              fontSize:"1rem"
            }}>
              {gasto.name_tipo_gasto}
            </option>
          ))}
        </select>
        <button
          onClick={handleDelete}
          style={{
            marginLeft:"10px",
            padding: "10px 10px",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width:"7.5rem",
          height:"3rem",
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
