import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { FETCH_REQUEST } from '@/lib/fetching';
import { useAuth } from '@/context/useAuth';

interface StatsITC {
  warning_status : boolean
  count_reception : string
	count_fridge : string
  
}

const WarningState = () => {
  const { auth } = useAuth();
  const [stats, setStats] = useState<StatsITC[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FETCH_REQUEST('warnings/stats', 'GET', auth.token);
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [auth.token]);

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartRef.current.chart instanceof Chart) {
        chartRef.current.chart.destroy();
      }

      const labels = stats.map(stat => stat.warning_status === true ? 'Warning' : 'Fixed issues' );
      const receptionData = stats.map(stat => stat.count_reception );
      const fridgeData = stats.map(stat => stat.count_fridge);

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Reception Section',
            data: receptionData,
            backgroundColor: 'rgba(110, 231, 183, 0.2',
            borderColor: 'rgba(110, 231, 183, 1)',
            borderWidth: 1
          },
          {
            label: 'Fridge Section',
            data: fridgeData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };




      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        
       
      });
    }
  }, [stats]);

  return (
  
  <canvas  ref={chartRef} />

  )

};

export default WarningState;
