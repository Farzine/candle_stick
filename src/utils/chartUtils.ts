import type { EChartsOption } from 'echarts';

export function buildChartOptions(
  xData: string[],
  yData: number[][]
): EChartsOption {
  return {
    title: {
      text: "Stock Price Graph",
      left: "center",
      
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      type: "category",
      data: xData,
      boundaryGap: true,
      axisLine: { lineStyle: { color: '#666' } },
      axisTick: { show: true },
    },
    yAxis: {
      scale: true,
      splitLine: { show: true, lineStyle: { color: '#ddd' } },
    },
    series: [
      {
        name: "AAPL",
        type: "candlestick",
        data: yData,
        itemStyle: {
          color: '#ef4444',
          color0: '#22c55e',
          borderColor: '#ef4444',
          borderColor0: '#22c55e',
        },
      },
    ],
    dataZoom: [
      {
        type: "slider",
        show: true,
        xAxisIndex: 0,
        start: 70,
        end: 100,
      },
      {
        type: "inside",
        xAxisIndex: 0,
        start: 70,
        end: 100,
      },
    ],
    toolbox: {
      show: true,
      right: "5%",
      feature: {
        saveAsImage: { show: true, title: "Download Png" },
        restore: { show: true, title: "Restore Data" },
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
  };
}

