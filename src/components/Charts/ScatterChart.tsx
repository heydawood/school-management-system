import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

interface ScatterData {
  name: string;
  count: number;
}

interface AppScatterChartProps {
  data: ScatterData[];
  width?: string | number;
  height?: number;
  colors?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  xDomain?: [number, number];
  yDomain?: [number, number];
}

const AppScatterChart: React.FC<AppScatterChartProps> = ({
  data,
  width = '100%',
  height = 400,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'],
  margin = { top: 20, right: 20, bottom: 20, left: 0 },
  xDomain = [0, 100],
  yDomain = [0, 'auto'],
}) => {
  // Count occurrences per category
  const countsMap: Record<string, number> = {};
  data.forEach((d) => {
    countsMap[d.name] = (countsMap[d.name] || 0) + 1;
  });

  // Unique categories
  const categories = [...new Set(data.map((d) => d.name))];

  // Category -> color map
  const categoryColorMap: Record<string, string> = {};
  categories.forEach((cat, i) => {
    categoryColorMap[cat] = colors[i % colors.length];
  });

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, count, size } = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow-lg text-sm">
          <p>
            <strong>{name}</strong>
          </p>
          <p>Count: {count}</p>
          <p>Records: {size}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <ScatterChart margin={margin}>
        <CartesianGrid />
        <XAxis type="number" dataKey="index" name="Index" domain={xDomain} />
        <YAxis type="number" dataKey="count" name="Count" domain={yDomain} />
        <ZAxis type="number" dataKey="size" range={[100, 1000]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

        {categories.map((cat) => (
          <Scatter
            key={cat}
            name={cat}
            data={data
              .map((d) => ({
                ...d,
                index: Math.random() * 100,
                size: countsMap[d.name],
              }))
              .filter((d) => d.name === cat)}
            fill={categoryColorMap[cat]}
            fillOpacity={0.6}
            strokeWidth={1}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default AppScatterChart;
