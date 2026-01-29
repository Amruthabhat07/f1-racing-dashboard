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
  // Mock comparison metrics (extend later with real stats)
  const data = [
    {
      metric: "Driver Number",
      [driverA.full_name]: driverA.driver_number,
      [driverB.full_name]: driverB.driver_number,
    },
  ];

  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-bold mb-4 text-center">
        {driverA.full_name} vs {driverB.full_name}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={driverA.full_name} fill="#dc2626" />
          <Bar dataKey={driverB.full_name} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DriverComparisonChart;
