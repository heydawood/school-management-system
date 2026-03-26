import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface ChartData {
  name: string; // X axis label
  [key: string]: number | string;
}

interface Props {
  data: ChartData[];
  bars: { dataKey: string; color: string; showLabel?: boolean }[];
  height?: number;
  yTicks?: number[];
  showGrid?: boolean;
  showTooltip?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 border rounded shadow bg-white">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.fill }}>
            {entry.dataKey}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ColoredBarChart = ({ data, bars, height = 300, yTicks, showGrid = true, showTooltip = true }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="name" />
        <YAxis ticks={yTicks} />
        {showTooltip && <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />}

        {bars.map((bar, idx) => (
          <Bar key={idx} dataKey={bar.dataKey} fill={bar.color} activeBar={false}>
            {bar.showLabel && <LabelList dataKey={bar.dataKey} position="top" fill="#333" />}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColoredBarChart;
