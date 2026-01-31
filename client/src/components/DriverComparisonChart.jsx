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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get(`/api/f1/drivers/${driverA.driver_number}/laps`),
      axios.get(`/api/f1/drivers/${driverB.driver_number}/laps`),
    ]).then(([resA, resB]) => {
      setStatsA(resA.data);
      setStatsB(resB.data);
      setLoading(false);
    });
  }, [driverA, driverB]);

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Loading lap comparison…
      </p>
    );
  }

  if (!statsA.bestLap || !statsB.bestLap) {
    return (
      <p className="text-center text-gray-400">
        Lap data not available for selected drivers
      </p>
    );
  }

  const data = [
    {
      metric: "Best Lap (s)",
      DriverA: statsA.bestLap,
      DriverB: statsB.bestLap,
    },
    {
      metric: "Average Lap (s)",
      DriverA: statsA.avgLap,
      DriverB: statsB.avgLap,
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
          <Bar name={driverA.full_name} dataKey="DriverA" fill="#dc2626" />
          <Bar name={driverB.full_name} dataKey="DriverB" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>

      <p className="text-center text-gray-400 mt-4 text-sm">
        Lower lap time indicates faster performance
      </p>
    </div>
  );
}

export default DriverComparisonChart;
