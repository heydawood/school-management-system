import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';

interface ChartData {
  name: string; // X axis label
  [key: string]: number | string;
}

interface BarConfig {
  dataKey: string;
  color: string;
  showLabel?: boolean;
  yAxisId?: string; // still supported for flexibility
}

interface Props {
  data: ChartData[];
  bars: BarConfig[];
  height?: number;
  yTicks?: number[];
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
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

const ComparisonBarChart = ({ data, bars, height = 300, yTicks, showGrid = true, showTooltip = true, showLegend = true }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="name" />

        {/* Always render just one Y axis (left) */}
        <YAxis yAxisId="left" orientation="left" ticks={yTicks} />

        {showTooltip && <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />}
        {showLegend && <Legend />}

        {bars.map((bar, idx) => (
          <Bar
            key={idx}
            dataKey={bar.dataKey}
            fill={bar.color}
            yAxisId="left" // force everything to the left axis
          >
            {bar.showLabel && <LabelList dataKey={bar.dataKey} position="top" fill="#333" />}
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonBarChart;
