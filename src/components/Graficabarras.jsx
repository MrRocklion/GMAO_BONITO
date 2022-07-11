import React  from "react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
        display: true,
        labels: {
            color: 'white',
        }
    },
       
},scales: {
  y: {
      ticks: {
          color: 'white',
      }
  },
  x:{
    ticks: {
        color: 'white',
    }
}
}

};
export default function BarChart(props){
    const data = {
        labels: [props.equipo],
        datasets: [{
          label: 'Mean Time to Repair',
          data: props.datos,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 2
        }]
      };
    return(
        <>
        <Bar options={options} data={data}/>
        </>
    )
}