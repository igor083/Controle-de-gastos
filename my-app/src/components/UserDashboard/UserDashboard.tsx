"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {User} from "@/app/types/User"

export default function UserDashboard({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null); // Defina o tipo correto para o estado
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user?id=${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Define os dados do usuário
        } else {
          router.push("/login"); // Redireciona para login se não autenticado
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [params.id, router]);

  if (!user) {
    return <p>Carregando...</p>; // Exibe enquanto carrega os dados
  }

  return (
    <div>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Este é o seu painel de controle.</p>
    </div>
  );
}
