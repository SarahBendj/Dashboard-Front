'use client'
import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { FETCH_REQUEST } from '@/lib/fetching';
import { useAuth } from '@/context/useAuth';

interface StatsITC {
 supplier_id : number
 contributors : string
 name : string
  
}

const supplier = () => {
  const { auth } = useAuth();
  const [stats, setStats] = useState<StatsITC[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FETCH_REQUEST('receptioncontrols/stats', 'GET', auth.token);
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
      const receptionData = stats.map(stat => stat.name);
      const fridgeData = stats.map(stat => stat.contributors);

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Reception Section',
            data: receptionData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
     

      chartRef.current.chart = new Chart(ctx as CanvasRenderingContext2D, {
        type: 'bar',
        data: data,
        options: options,
      });
    }
      
  }, []); 

  return <canvas ref={chartRef} />;
}

export default SupplierStats;