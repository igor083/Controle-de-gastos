"use client";

import { useRouter } from "next/navigation";
import Button from "../Button_Home/Button";
import './style.scss';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Faz a requisição para a API de logout
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (response.ok) {
        // Redireciona para a página de login após logout bem-sucedido
        router.push("/login");
      } else {
        // Exibe erro se a API retornar um status não-ok
        console.error("Erro ao realizar logout. Status:", response.status);
      }
    } catch (error) {
      // Captura erros na requisição
      console.error("Erro no handleLogout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
    >Logout</button>
  );
}
