'use client'
import { FETCH_REQUEST } from '@/lib/fetching';
import Chart, { ChartItem } from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { MemberStatsITC } from '@/TYPES.ts/creationData';
import { useAuth } from '@/context/useAuth';
import parseAndFormatDate from '@/hook/dateFormat';

interface DataItem {
  controle_date: string;
  max_controle: number;
  color ? : string;
}

interface TransformedData {
  [key: string]: {
    identificant: string;
    data: DataItem[];
  };
}


const MemberStats: React.FC = () => {
  const { auth } = useAuth();
  const [members, setMembers] = useState<MemberStatsITC[]>([]);
  const [dates, setDates] = useState<string[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: MemberStatsITC[] = await FETCH_REQUEST('users/stats', 'GET', auth.token);
        setMembers(data);

        if (data.length > 2) {
          setDates([
            data[0].controle_date,
            data[Math.floor(data.length / 2)].controle_date,
            data[data.length - 1].controle_date,
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [auth.token]);

  const transformedData: TransformedData = {};
  const colorMap: { [identificant: string]: string } = {};

  members.forEach((record) => {
    const { identificant, controle_date, max_controle } = record
    const color: string = colorMap[identificant] || `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
       colorMap[identificant] = color;


    if (transformedData[identificant]) {
      transformedData[identificant].data.push({ controle_date, max_controle,color});
    } else {
      transformedData[identificant] = { identificant, data: [{ controle_date, max_controle ,color}] };
    }
  });

  const resultArray = Object.values(transformedData);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef.current && members.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      

      const labels = resultArray.map((item) => {
        const identificant = item.identificant;
        const controle_count = item.data.map((dataItem) => dataItem.max_controle);
        const color = item.data.map((dataItem) => dataItem.color);


        return {
          label: identificant,
          data: controle_count,
          fill: false,
          tension: 0.1,
          borderColor: color,
          backgroundColor: color,
        };
      });

      const chartData = {
        labels: dates.map(date => parseAndFormatDate(date)),
        datasets: labels,
      };

      chartInstanceRef.current = new Chart(ctx as ChartItem, {
        type: 'line',
        data: chartData,
        options: {},
      });
    }
  }, [members, resultArray, dates]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MemberStats;
