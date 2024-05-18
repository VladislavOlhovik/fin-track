'use client';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DonutChartProps {
  data: { value: number; name: string }[];
  name: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  name,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const option: echarts.EChartOption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: name,
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data,
          },
        ],
      };
      chartInstance.setOption(option);

      // Resize chart on window resize
      const resizeChart = () => {
        chartInstance.resize();
      };

      window.addEventListener('resize', resizeChart);

      return () => {
        window.removeEventListener('resize', resizeChart);
        chartInstance.dispose();
      };
    }
  }, [data, name]);

  return <div ref={chartRef} className="w-full h-96" />;
};
