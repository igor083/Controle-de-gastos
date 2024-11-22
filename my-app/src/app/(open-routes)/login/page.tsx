"use client"; // Marcar como componente cliente

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button_Home/Button";
import BigLogo from "@/components/BigLogo/BigLogo";
import "./style.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // Limpa mensagens de erro antes da nova tentativa
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        
        const data = await response.json();
        console.log("Login successful:", data.message);
        
        // Redireciona para a página do usuário
        const userId = data.id; // Pega o ID do usuário retornado
        
        console.log("este deveria ser o id:" + userId);
        console.log("Era pra executar");
        router.push(`/user/${userId}`); // Redireciona para o painel do usuário
        console.log("Aqui ja passou");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <BigLogo />
      </div>
      <div className="texto-login">
        <h1>
          <span>Faça Login</span> abaixo!
        </h1>
        <p>Entre na sua conta inserindo os dados abaixo:</p>
      </div>
      <div className="dados">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <Button text="Login" onClick={handleLogin} />
      </div>
      <div className="footer">
        <p>Ainda não possui conta?</p>
        <button onClick={() => router.push("/registro")}>Registre-se</button>
      </div>
      <div className="motivacional">
        <p>
          "Você precisa conquistar aquilo que o dinheiro não compra. Caso
          contrário, será um miserável, ainda que seja um milionário." <br />
          Augusto Cury
        </p>
      </div>
    </div>
  );
}
