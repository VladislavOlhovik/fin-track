'use client';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface MonthlyBalancePoint {
  date: string;
  total: number;
  difference: number | null;
}

interface LineChartWithDiffProps {
  name: string;
  title: string;
  data: MonthlyBalancePoint[];
}

interface LineChartProps {
  name: string;
  title: string;
  xAxisData: string[];
  yAxisData: number[];
}

export const LineChartWithDiff = ({
  name,
  title,
  data,
}: LineChartWithDiffProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const option: echarts.EChartsOption = {
        title: {
          text: title,
        },
        tooltip: {
          trigger: 'axis',

          formatter: params => {
            const point = (
              Array.isArray(params) ? params[0] : params
            ) as {
              dataIndex: number;
              marker: string;
              seriesName: string;
              name: string;
            };

            const item = data[point.dataIndex];

            const formatNumber = (value: number) =>
              new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(value);

            const differenceText =
              item.difference === null
                ? 'N/A'
                : `${item.difference > 0 ? '+' : ''}${formatNumber(
                    item.difference
                  )}`;

            const differenceColor =
              item.difference === null
                ? '#666'
                : item.difference >= 0
                  ? '#16a34a'
                  : '#dc2626';

            return `
      <div style="margin-bottom:8px">${point.name}</div>

      <div>
        ${point.marker} ${point.seriesName}
        <strong style="margin-left:20px">
          ${formatNumber(item.total)}
        </strong>
      </div>

      <div style="margin-top:6px">
        Difference from previous month
        <strong style="margin-left:12px;color:${differenceColor}">
          ${differenceText}
        </strong>
      </div>
    `;
          },
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
          data: data.map(item => item.date),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: name,
            type: 'line',
            stack: 'Total',
            data: data.map(item => item.total),
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
  }, [name, title, data]);

  return <div ref={chartRef} className="w-full h-96" />;
};

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
      const option: echarts.EChartsOption = {
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
