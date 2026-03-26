import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieData {
  name: string;
  value: number;
}

interface AppPieChartProps {
  data: PieData[];
  colors?: string[];
  width?: string | number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

const PieDonutChart: React.FC<AppPieChartProps> = ({
  data,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'],
  width = '100%',
  height = 400,
  innerRadius = 0,
  outerRadius = 100,
}) => {
  const total = data?.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="value"
          label={({ name, value }) => `${name} ${((value / total) * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number, name: string) => [`${value} (${(((value as number) / total) * 100).toFixed(0)}%)`, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieDonutChart;
