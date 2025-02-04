"use client"
import { useState, useEffect, useCallback } from 'react';
import { fetchStockData } from '../services/api';
import { buildChartOptions } from '../utils/chartUtils';
import type { EChartsOption } from 'echarts';

export function useStockData() {
  const [allXData, setAllXData] = useState<string[]>([]);
  const [allYData, setAllYData] = useState<number[][]>([]);
  const [chartOptions, setChartOptions] = useState<EChartsOption>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { xData, yData } = await fetchStockData();
        setAllXData(xData);
        setAllYData(yData);
        setChartOptions(buildChartOptions(xData, yData));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRange = useCallback((range: string) => {
    if (!allXData.length) return;

    const total = allXData.length;
    const now = new Date(allXData[allXData.length - 1]);
    let startIndex = 0;

    switch (range) {
      case "1m":
        startIndex = Math.max(total - 22, 0);
        break;
      case "3m":
        startIndex = Math.max(total - 66, 0);
        break;
      case "6m":
        startIndex = Math.max(total - 132, 0);
        break;
      case "ytd": {
        const yearStart = new Date(now.getFullYear(), 0, 1).toLocaleDateString("en-US");
        startIndex = Math.max(allXData.findIndex((d) => d >= yearStart), 0);
        break;
      }
      case "1y":
        startIndex = Math.max(total - 252, 0);
        break;
      default:
        startIndex = 0;
    }

    const startPercent = (startIndex / total) * 100;
    setChartOptions(prev => ({
      ...prev,
      dataZoom: [
        { start: startPercent, end: 100, type: "slider" },
        { start: startPercent, end: 100, type: "inside" },
      ],
    }));
  }, [allXData]);

  return {
    data: {
      chartData: { xData: allXData, yData: allYData },
      chartOptions,
      handleRange,
    },
    loading,
    error,
  };
}