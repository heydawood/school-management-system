import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: any[];
  color?: string;
  dataKey?: string; // which field to plot (default: uv)
  height?: number;
  yTicks?: number[];
  showGrid?: boolean;
  showTooltip?: boolean;
  gradientId?: string;
}

const ColoredLineChart = ({
  data,
  color = '#8884d8',
  dataKey = 'uv',
  height = 250,
  yTicks = [0, 20, 40, 60, 80, 100],
  showGrid = true,
  showTooltip = true,
  gradientId = 'colorGradient',
}: Props) => {
  return (
    data &&
    data?.length > 0 && (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: -25,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              {/* Darker near the line */}
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              {/* Lighter near the bottom */}
              <stop offset="80%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis ticks={yTicks} />
          {showTooltip && <Tooltip />}
          <Area type="linear" dataKey={dataKey} stroke={color} fillOpacity={1} fill={`url(#${gradientId})`} />
        </AreaChart>
      </ResponsiveContainer>
    )
  );
};

export default ColoredLineChart;
