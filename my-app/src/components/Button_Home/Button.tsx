"use client"; // Marcar como componente cliente

import React from 'react';
import { useRouter } from 'next/navigation';
import './style.scss';

interface ButtonProps {
  text: string;
  href?: string; // URL opcional para redirecionamento
  onClick?: () => void; // Função opcional para ação personalizada
}

const Button: React.FC<ButtonProps> = ({ text, href, onClick }) => {
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
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
