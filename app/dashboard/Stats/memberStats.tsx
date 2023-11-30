// Import necessary types and libraries
import { FETCH_REQUEST } from '@/lib/fetching';
import Chart, { ChartItem } from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { MemberStatsITC } from '@/TYPES.ts/creationData';
import { useAuth } from '@/context/useAuth';
import parseAndFormatDate from '@/hook/dateFormat';

interface DataItem {
  controle_date: string;
  max_controle: number;
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
  console.log(members)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: MemberStatsITC[] = await FETCH_REQUEST('users/stats', 'GET', auth.token);
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [auth.token]);

  const transformedData: TransformedData = {};

  members.forEach((record) => {
    const { identificant, controle_date, max_controle } = record;

    if (transformedData[identificant]) {
      transformedData[identificant].data.push({ controle_date, max_controle });
    } else {
      transformedData[identificant] = { identificant, data: [{ controle_date, max_controle }] };
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

        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;

        return {
          label: identificant,
          data: controle_count,
          fill: false,
          tension: 0.1,
          backgroundColor: randomColor,
          borderColor: randomColor,
        };
      });

      const chartData = {
        labels: members.map((dataItem) => parseAndFormatDate(dataItem.controle_date)),
        datasets: labels,
      };

      chartInstanceRef.current = new Chart(ctx as ChartItem, {
        type: 'line',
        data: chartData,
        options: {
    
        },
      });
    }
  }, [members , resultArray]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MemberStats;
