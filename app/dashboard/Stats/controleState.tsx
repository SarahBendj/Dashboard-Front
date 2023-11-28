'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
  
      // Destroy existing chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
      const data = {
        labels: ['Fridge', 'Reception', 'Sanitizing'],
        datasets: [
          {
            data: [30, 50, 20],
            backgroundColor: ['teal', '#196f72', '#15456d'],
          },
        ],
      };
  
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
  
      // Create a new Chart instance
      chartRef.current.chart = new Chart(ctx as CanvasRenderingContext2D, {
        type: 'doughnut',
        data: data,
        options: options,
      });
    }
  }, []);
  
  return <canvas ref={chartRef} />;
};

export default DoughnutChart;
