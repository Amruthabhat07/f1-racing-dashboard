import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter,
} from "recharts";

function LapTimeChart({ laps, pitLaps }) {
  if (!laps || laps.length === 0) return null;

  const data = laps.map(lap => ({
  lap: lap.lap_number,
  time: lap.lap_duration,
  isPit: pitLaps && pitLaps.length > 0
    ? pitLaps.includes(lap.lap_number)
    : lap.lap_number % 15 === 0, // demo pit every ~15 laps
}));


  return (
    <div className="mt-6 bg-[#111827] p-4 rounded-lg">
      <h3 className="font-bold mb-2">Lap Time Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="lap" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="time"
            stroke="#3b82f6"
            dot={false}
          />
          <Scatter
            data={data.filter(d => d.isPit)}
            fill="#facc15"
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-sm text-gray-400 mt-2">
        🟡 Yellow dots indicate pit-affected laps
      </p>
    </div>
  );
}

export default LapTimeChart;
