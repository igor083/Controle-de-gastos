"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";  // Importa o hook `useParams`

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserPage() {
  const { id } = useParams();  // Agora usamos useParams() para pegar o id
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Usuário não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };

    if (id) {  // Certifique-se de que o id está presente antes de fazer a requisição
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Este é o seu painel de controle.</p>
    </div>
  );
}
