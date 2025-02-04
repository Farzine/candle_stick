export async function fetchStockData() {
    const response = await fetch(
      "https://demo-live-data.highcharts.com/aapl-ohlc.json"
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rawData: number[][] = await response.json();
    
    const xData: string[] = [];
    const yData: number[][] = [];
  
    rawData.forEach(([time, open, high, low, close]) => {
      const dateString = new Date(time).toLocaleDateString("en-US");
      xData.push(dateString);
      yData.push([open, close, low, high]);
    });
  
    return { xData, yData };
  }
  
  export type rawData = ReturnType<typeof fetchStockData>;