import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Chart = ({ prices , dates}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
 
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `Price in INR`,
        data: prices,
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgba(255,99,132,0.5)',
      },
    ],
  };

  return <Line options={{ responsive: true }} data={chartData}></Line>;
};

export default Chart;
