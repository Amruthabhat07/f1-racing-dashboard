import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DriverComparisonChart({ driverA, driverB }) {
  const [statsA, setStatsA] = useState(null);
  const [statsB, setStatsB] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/f1/drivers/${driverA.driver_number}/laps`)
      .then(res => setStatsA(res.data));

    axios
      .get(`/api/f1/drivers/${driverB.driver_number}/laps`)
      .then(res => setStatsB(res.data));
  }, [driverA, driverB]);

  if (!statsA || !statsB) return null;

  const data = [
    {
      metric: "Best Lap (s)",
      [driverA.full_name]: statsA.bestLap,
      [driverB.full_name]: statsB.bestLap,
    },
    {
      metric: "Average Lap (s)",
      [driverA.full_name]: statsA.avgLap,
      [driverB.full_name]: statsB.avgLap,
    },
  ];

  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-bold mb-4 text-center">
        Lap Time Comparison
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={driverA.full_name} fill="#dc2626" />
          <Bar dataKey={driverB.full_name} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>

      <p className="text-center text-gray-400 mt-4 text-sm">
        Lower lap time = faster driver
      </p>
    </div>
  );
}

export default DriverComparisonChart;
