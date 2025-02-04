"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useStockData } from "../../hooks/useStockData";
import CircularWithValueLabel from "../CandleChartLoader";
import RangeSelector from "./RangeSelector";
import CandlestickChart from "./CandlestickChart";

export default function ChartContainer() {
  const { data, loading, error } = useStockData();
  const [progress, setProgress] = useState(0);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowChart(false);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => setShowChart(true), 500);
    }
  }, [loading]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <p className="text-red-500 font-semibold">
          Error loading chart data: {error.message}
        </p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border">
      <CardHeader className="flex items-center">
        <CardTitle>AAPL Stock Price</CardTitle>
        <CardDescription>
          Candlestick Chart Representation (Apache ECharts)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RangeSelector onRangeSelect={data?.handleRange} disabled={loading} />
        {loading || !showChart ? (
          <div className="flex items-center justify-center h-[600px]">
            <CircularWithValueLabel value={progress} />
          </div>
        ) : (
          <CandlestickChart
            data={data?.chartData}
            options={data?.chartOptions}
          />
        )}
      </CardContent>
    </Card>
  );
}
