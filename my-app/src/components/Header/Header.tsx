// src/app/header.tsx

import React from 'react';
import './style.scss';
import Image from 'next/image';
import LogoutButton from '../Logout/LogoutBtn';
import Link from 'next/link';

interface HeaderProps {
  userId: number; // Add a prop for the user ID
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  return (
    <header>
      <div className="logo">
        <Link href={`/user/${userId}`}><Image
          src="/MeuDin_pequeno.png"
          width={120}
          height={60}
          alt="Logo Meu Din"
        /></Link>
      </div>
      <div className="options">
   
        <Link href={`/user/${userId}`}>
          <button className="neutro">Home</button>
        </Link>
        <Link href={`/user/historico/${userId}`}>
          <button className="neutro">Histórico</button>
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
