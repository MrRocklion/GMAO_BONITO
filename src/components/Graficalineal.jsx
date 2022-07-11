import React  from "react";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
  } from 'chart.js';
 
 
  ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
  );

export default function LineChart(props){
  const config = {
    type: 'line',
    options: {
      responsive: true,
      interaction: {
        intersect: false,
        axis: 'x'
      },
      plugins: {
        title: {
          display: true,
        }
      }
    }
  };
    const data = {
        labels: props.labels,
        datasets: [{
          label: 'Consumo Electrico',
          data: props.datos,
          fill: false,
          borderColor: 'rgb(61,167,117)',
          backgroundColor:  'rgb(61,167, 117)',
          tension: 0.0,
          stepped: true,
 
        }]
      };
    return(
        <>
                <Line options={config} data= {data}/>
        </>
    )
}