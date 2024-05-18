'use client';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface WaterfallChartProps {
  data?: { value: number; name: string }[];
  name?: string;
}

export const WaterfallChart: React.FC<
  WaterfallChartProps
> = ({ data, name }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const option: echarts.EChartOption = {
        title: {
          text: 'Accumulated Waterfall Chart',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params: any) {
            let tar;
            if (params[1] && params[1].value !== '-') {
              tar = params[1];
            } else {
              tar = params[2];
            }
            return (
              tar &&
              tar.name +
                '<br/>' +
                tar.seriesName +
                ' : ' +
                tar.value
            );
          },
        },
        legend: {
          data: ['Expenses', 'Income'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: (function () {
            let list = [];
            for (let i = 1; i <= 11; i++) {
              list.push('Nov ' + i);
            }
            return list;
          })(),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Placeholder',
            type: 'bar',
            stack: 'Total',
            silent: true,
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
            emphasis: {
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent',
              },
            },
            data: [
              0, 900, 1245, 1530, 1376, 1376, 1511, 1689,
              1856, 1495, 1292,
            ],
          },
          {
            name: 'Income',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'top',
            },
            data: [
              900,
              345,
              393,
              '-',
              '-',
              135,
              178,
              286,
              '-',
              '-',
              '-',
            ],
          },
          {
            name: 'Expenses',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'bottom',
            },
            data: [
              '-',
              '-',
              '-',
              108,
              154,
              '-',
              '-',
              '-',
              119,
              361,
              203,
            ],
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
