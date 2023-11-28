import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState} from 'react';


const ReceptionStats = ({ status }: { status: boolean[] }) => {
    const [stability, setStability] = useState<number[]>([]);
    const [perturbation, setPerturbation] = useState<number[]>([]);
    console.log(status)
  
    useEffect(() => {
      const stabilityArray: number[] = [];
      const perturbationArray: number[] = [];
     
      status.forEach((s, index) => {
        if (s) {
          perturbationArray.push(index);
        } else {
          stabilityArray.push(index);
        }
      });
  
      setStability(stabilityArray);
      setPerturbation(perturbationArray);
    }, [status]);
  
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
  
    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
  
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const data = {
          labels: ['perturbation', 'Stability'],
          datasets: [
            {
              data: [perturbation.length, stability.length],
              backgroundColor: ['rgba(161, 98 ,7,0.3)', 'rgba(54, 162, 235, 0.2)'],
              borderColor: ['rgba(113, 63, 18,0.8)', 'rgba(54, 162, 235, 0.8)'],
              borderWidth: 2,
              hoverBackgroundColor: ['rgba(110, 231, 183, 0.6)', 'rgba(14, 116, 144, 0.5)'],
              hoverBorderColor: ['rgb(110, 231, 183)', 'rgb(14, 116, 144)'],
            },
          ],
        };
        
  
        if (ctx) {
          chartInstanceRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            
          });
        }
      }
    }, [stability, perturbation]);
  
    return <canvas ref={chartRef} />;
  };
  
  export default ReceptionStats;