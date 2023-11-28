import Chart from 'chart.js/auto';
import React, { useEffect, useRef} from 'react';


interface temperatureStatsITC {
    temperatures : number[]
    temperature_required : number 
}

const FridgeStats : React.FC<temperatureStatsITC> = ({temperatures, temperature_required }) => {
    
    let temperature_requiredArr : number[] = [];
    for (let index = 0; index < temperatures.length; index++) {
        temperature_requiredArr.push(temperature_required)
        
    }

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
  
    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
  
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

       
            const data = {
                        labels: 'Tempera',

              datasets: [
                {
                  label: 'Temperature required',
                  data: temperature_requiredArr,
                  backgroundColor: 'rgba(34 ,211 ,238,0.5)',
                  borderColor: 'rgba(8, 145, 178, 0.8)',
                  borderWidth: 2,
                },
                {
                  label: 'Temperatures',
                  data: temperatures,
                  backgroundColor: 'rgba(113, 63, 18, 0.5)',
                  borderColor: 'rgb(113, 63, 18)',
                  borderWidth: 2,
                },
              ],
            };
    
      
            if (ctx) {
                chartInstanceRef.current = new Chart(ctx, {
                  type: 'line',
                  data: data,
                  
                });
              }
            }
          }, [temperature_required, temperatures , temperature_requiredArr]);
        
          return <canvas ref={chartRef} />;
        };
        
export default FridgeStats