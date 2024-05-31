'use client';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface LineChartProps {
  name: string;
  title: string;
  xAxisData: string[];
  yAxisData: number[];
}

export const LineChart = ({
  name,
  title,
  xAxisData,
  yAxisData,
}: LineChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const option: echarts.EChartOption = {
        title: {
          text: title,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [name],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: name,
            type: 'line',
            stack: 'Total',
            data: yAxisData,
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
  }, [name, title, xAxisData, yAxisData]);

  return <div ref={chartRef} className="w-full h-96" />;
};
