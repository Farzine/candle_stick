"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import type { EChartsOption } from 'echarts';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface CandlestickChartProps {
  data: {
    xData: string[];
    yData: number[][];
  };
  options: EChartsOption;
}

export default function CandlestickChart({ data, options }: CandlestickChartProps) {
  if (!data || !options) return null;
  
  return (
    <ReactECharts
      option={options}
      notMerge={true}
      lazyUpdate={true}
      style={{ width: "100%", height: "600px" }}
    />
  );
}