// src/components/LiveStatusChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format } from 'date-fns';

interface DataPoint {
  time: Date | number;
  value: number;
}

interface LiveStatusChartProps {
  data: DataPoint[];
  dataKey: keyof DataPoint;
  yAxisLabel: string;
  strokeColor: string;
  yAxisDomain?: [number, number];
}

const LiveStatusChart: React.FC<LiveStatusChartProps> = ({ data, dataKey, yAxisLabel, strokeColor, yAxisDomain }) => {
  // Log time values when component renders or receives new props
  React.useEffect(() => {
    console.log('Data received:', data);
    console.log('dataKey received:', dataKey);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          type="Date"
          scale="time"
          domain={['auto', 'auto']}
          tickFormatter={(time: number) => format(new Date(time), 'HH:mm:ss')}
        />
        <YAxis
          yAxisId="left"
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          tickFormatter={(value: number) => `${value}`}
          domain={yAxisDomain || ['auto', 'auto']}
        />
        <Tooltip labelFormatter={(time: number) => format(new Date(time), 'HH:mm:ss')} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={strokeColor} activeDot={{ r: 8 }} yAxisId="left" />
        <ReferenceLine y={0} yAxisId="left" stroke="black" label="Zero" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LiveStatusChart;
