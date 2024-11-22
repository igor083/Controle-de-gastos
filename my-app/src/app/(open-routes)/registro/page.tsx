"use client"
import Button from "@/components/Button_Home/Button";
import "./style.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Limpar mensagem anterior

    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("Conta criada com sucesso! Faça login.");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Erro ao criar conta.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setMessage("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <a href="/">
          <Image
            src={"/Meu Din.svg"}
            alt="Logo Meu Din"
            width={389}
            height={140}
          />
        </a>
      </div>
      <div className="texto-login">
        <h1>
          Crie sua conta grátis e venha<br /> <span>economizar!</span>
        </h1>
        <p>Crie sua conta inserindo os dados abaixo:</p>
      </div>
      <form className="dados" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
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
        <Button type="submit" text="Crie sua conta"/>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="footer">
        <p>Já possui uma conta?</p>
        <Link href={"/login"}><Button  text="Login"/></Link>
          
        
      </div>
    </div>
  );
}
