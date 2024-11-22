"use client";
import './style.scss';
import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PieController } from "chart.js";

// Registra os componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, PieController);

interface Gasto {
  descricao: string;
  valor: number;
  tipo: string;
}

interface Props {
  gastos: Gasto[];
}

export default function PizzaChart({ gastos }: Props) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  // Função para processar os dados dos gastos e separá-los por tipo
  const processData = () => {
    const tipoGastoMap = new Map<string, number>();

    // Agrupa os gastos por tipo e soma os valores
    gastos.forEach((gasto) => {
      if (tipoGastoMap.has(gasto.tipo)) {
        tipoGastoMap.set(gasto.tipo, tipoGastoMap.get(gasto.tipo)! + gasto.valor);
      } else {
        tipoGastoMap.set(gasto.tipo, gasto.valor);
      }
    });

    // Preparar os dados para o gráfico
    const labels = Array.from(tipoGastoMap.keys());
    const data = Array.from(tipoGastoMap.values());

    setChartData({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33F6", "#33F6FF"], // Cores variadas
        },
      ],
    });
  };

  useEffect(() => {
    if (gastos.length > 0) {
      processData();
    }
  }, [gastos]);

  useEffect(() => {
    if (chartRef.current && chartData) {
      const myChart = new ChartJS(chartRef.current, {
        type: "pie",
        data: chartData,
        
      });

      // Limpar o gráfico ao desmontar o componente
      return () => {
        myChart.destroy();
      };
    }
  }, [chartData]);

  if (!chartData) {
    return <p>Nenhum grafico disponível</p>;
  }

  return (
    <div className='container'>
      <canvas ref={chartRef}  />
    </div>
  );
}
