import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: any[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  yTicks?: number[];
  activeKey?: string;
  inactiveKey?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const CustomTooltip = ({ active, payload, label, activeKey, inactiveKey, activeColor, inactiveColor }: any) => {
  if (active && payload && payload.length) {
    const activeVal = payload.find((p: any) => p.dataKey === activeKey)?.value ?? 0;
    const inactiveVal = payload.find((p: any) => p.dataKey === inactiveKey)?.value ?? 0;
    const diff = activeVal - inactiveVal;

    return (
      <div className="bg-white shadow-md rounded p-2 border border-gray-200">
        <p className="font-semibold">{label}</p>
        <p style={{ color: activeColor }}>Active: {activeVal}</p>
        <p style={{ color: inactiveColor }}>Inactive: {inactiveVal}</p>
      </div>
    );
  }
  return null;
};

const ComparisonLineChart = ({
  data,
  height = 250,
  showGrid = true,
  showTooltip = true,
  yTicks,
  activeKey = 'active',
  inactiveKey = 'inactive',
  activeColor = '#82ca9d',
  inactiveColor = '#8884d8',
}: Props) => {
  return (
    data &&
    data.length > 0 && (
      <ResponsiveContainer width={'100%'} height={height}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 25,
            left: 0,
            bottom: 0,
          }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis ticks={yTicks} />
          {showTooltip && <Tooltip content={<CustomTooltip activeKey={activeKey} inactiveKey={inactiveKey} activeColor={activeColor} inactiveColor={inactiveColor} />} />}
          <Line type="monotone" dataKey={activeKey} stroke={activeColor} activeDot={{ r: 6 }} name="Active" />
          <Line type="monotone" dataKey={inactiveKey} stroke={inactiveColor} name="Inactive" />
        </LineChart>
      </ResponsiveContainer>
    )
  );
};

export default ComparisonLineChart;
