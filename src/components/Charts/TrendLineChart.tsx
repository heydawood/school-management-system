import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  [key: string]: number | string; // Flexible keys
}

interface Props {
  data: ChartData[];
  color?: string;
  dataKey?: string; // which field to plot (default: uv)
  height?: number;
  yTicks?: number[];
  showGrid?: boolean;
  showTooltip?: boolean;
}

const TrendLineChart = ({
  data,
  color = '#10b981', // default green
  dataKey = 'uv',
  height = 250,
  yTicks,
  showGrid = true,
  showTooltip = true,
}: Props) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis ticks={yTicks} axisLine={false} tickLine={false} />
        {showTooltip && <Tooltip />}
        <Line
          type="linear"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{
            r: 6,
            stroke: color,
            strokeWidth: 5,
            fill: 'white',
          }}
          activeDot={{
            r: 7,
            stroke: color,
            strokeWidth: 2,
            fill: 'white',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendLineChart;
