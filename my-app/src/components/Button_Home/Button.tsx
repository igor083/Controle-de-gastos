"use client"; // Marcar como componente cliente

import React from 'react';
import { useRouter } from 'next/navigation';
import './style.scss';

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  href?: string; // URL opcional para redirecionamento
  onClick?: () => void; // Função opcional para ação personalizada
}

const Button: React.FC<ButtonProps> = ({ text, href, onClick,type="button" }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Executa a função personalizada, se fornecida
    }
    if (href) {
      router.push(href); // Redireciona, se a URL for fornecida
    }
  };

  return (
    <button onClick={handleClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
