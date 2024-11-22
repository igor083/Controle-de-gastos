"use client";
import './style.scss';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";  // Importa o hook `useParams`
import PizzaChart from "@/components/PizzaChart/PizzaChart";  // Importa o componente de gráfico
import Header from "@/components/Header/Header";
import Button_gastos from '@/components/Button_gastos/Button_gastos';
import DeleteTipoGasto from '@/components/DeleteTipoGasto/DeleteTipoGasto';
import AdicionaGasto from '@/components/AdicionaGasto/AdicionaGasto';
import DeleteGasto from '@/components/DeleteGasto/DeleteGasto';
import AdicionaDinheiro from '@/components/AdicionarDinheiro/AdicionaDinheiro';

interface User {
  id: number;
  name: string;
  email: string;
  banca: number
}

interface Gasto {
  descricao: string;
  valor: number;
  tipo: string;
}

export default function UserPage() {
  const { id } = useParams();  // Agora usamos useParams() para pegar o id
  const [user, setUser] = useState<User | null>(null);
  const [gastos, setGastos] = useState<Gasto[]>([]);  // Novo estado para armazenar os gastos

  // Função para buscar os dados do usuário
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

    if (id) {
      fetchUser();
    }
  }, [id]);

  // Função para buscar os gastos do usuário
  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await fetch(`/api/gastos?id_usuario=${id}`);  // Passando o id na URL
        if (response.ok) {
          const data = await response.json();
          setGastos(data);  // Armazena os gastos no estado
        } else {
          console.error("Gastos não encontrados.");
        }
      } catch (err) {
        console.error("Erro ao buscar dados dos gastos:", err);
      }
    };

    if (id) {
      fetchGastos();  // Chama a função para buscar os gastos
    }
  }, [id]);

  if (!user) {
    return <p>Carregando usuário...</p>;
  }


  return (
    <div>
      <Header userId={user.id}/>
      <div className="body">

        <h1 className='name'>Bem-vindo, <span>{user.name}s</span>!</h1>
        <div className='saldos'>
          <div className='total'>
            <h3>Saldo total:</h3> <h1>R${user.banca.toFixed(2)}</h1>
          </div>


        </div>
        <h3 className='p_tipogasto'>Por aqui você pode gerenciar em que você está gastando.</h3>

        <div className="tipoGasto">

          <div className='card'>
            <div className='icon-tipo'>
              </div>
            <div className='btn-tipo'><h2>Adicionar tipo de gasto</h2>
              <p>Clique abaixo para adicionar tipos</p>
              <Button_gastos userId={user.id} /></div>

          </div>
          <div className='card'>
            <div className='icon-tipo'>
              </div>
            <div className='btn-tipo'><h2>Remover tipo de gasto</h2>
              <p>Clique abaixo para remover tipos indesejados</p>
              <DeleteTipoGasto userId={user.id} /></div>

          </div>
        </div>
        <h3 className='p_tipogasto'>Por aqui você administra todas as suas transações financeiras.</h3>
        <div className="gastos">
          <div className="card">
            <div>
              <h2>Receber dinheiro</h2>
              <p>Adicione suas quantias recebidas!</p>
              <AdicionaDinheiro userId={user.id} />
            </div>
          </div>
          <div className="card">
            <div>
              <h2>Adicionar gasto</h2>
              <p>Adicione todos os seus gastos a partir desta opção.</p>
              <AdicionaGasto userId={user.id} />
            </div>
          </div>
          <div className="card">
            <div>
              
              <DeleteGasto userId={user.id} />
            </div>
          </div>



        </div>

      </div>

    </div>
  );
}
