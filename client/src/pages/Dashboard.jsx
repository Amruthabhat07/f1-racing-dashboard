import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [lapStats, setLapStats] = useState([]);

  useEffect(() => {
    axios.get("/api/f1/drivers").then((res) => setDrivers(res.data));
  }, []);

  useEffect(() => {
    const fetchLapStats = async () => {
      const stats = [];

      for (const driver of drivers.slice(0, 5)) {
        const res = await axios.get(
          `/api/f1/drivers/${driver.driver_number}/laps`
        );
        if (res.data.bestLap) {
          stats.push({
            name: driver.full_name,
            bestLap: res.data.bestLap,
            avgLap: res.data.avgLap,
          });
        }
      }

      setLapStats(stats);
    };

    if (drivers.length) fetchLapStats();
  }, [drivers]);

  const fastestDriver = lapStats.reduce(
    (best, d) => (!best || d.bestLap < best.bestLap ? d : best),
    null
  );

  const avgLap =
    lapStats.reduce((sum, d) => sum + d.avgLap, 0) /
    (lapStats.length || 1);

  return (
    <div className="min-h-screen bg-[#0b0f19] p-8 text-gray-200">
      {/* Hero */}
      <h1 className="text-4xl font-extrabold text-red-600 mb-2">
        Formula 1 Analytics Dashboard
      </h1>
      <p className="text-gray-400 mb-10">
        Explore drivers and compare performance using real lap-time data.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Total Drivers</p>
          <p className="text-3xl font-bold">{drivers.length}</p>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Fastest Driver</p>
          <p className="text-lg font-semibold">
            {fastestDriver
              ? `${fastestDriver.name} (${fastestDriver.bestLap}s)`
              : "Loading..."}
          </p>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Avg Lap (Top 5)</p>
          <p className="text-2xl font-bold">
            {avgLap ? avgLap.toFixed(2) + "s" : "Loading..."}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-6">
        <Link
          to="/drivers"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
        >
          View Drivers
        </Link>

        <Link
          to="/compare"
          className="bg-[#111827] border border-gray-700 hover:border-red-600 px-6 py-3 rounded-lg font-semibold"
        >
          Compare Drivers
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
