import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import LapTimeChart from "../components/LapTimeChart";

function DriverProfile() {
  const { driverNumber } = useParams();

  const [driver, setDriver] = useState(null);
  const [stats, setStats] = useState(null);
  const [laps, setLaps] = useState([]);


  useEffect(() => {
    axios
      .get(`/api/f1/drivers/${driverNumber}`)
      .then((res) => setDriver(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`/api/f1/drivers/${driverNumber}/laps`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`/api/f1/drivers/${driverNumber}/laps/raw`)
      .then(res => setLaps(res.data))
      .catch(err => console.error(err));

  }, [driverNumber]);

  if (!driver || !stats) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0b0f19] p-6 text-gray-200">
      <Link to="/" className="text-red-500">← Back</Link>

      <h1 className="text-3xl font-bold mt-4">{driver.full_name}</h1>

      <div className="mt-4 space-y-1">
        <p>Team: {driver.team_name}</p>
        <p>Country: {driver.country_code}</p>
        <p>Driver Number: {driver.driver_number}</p>
      </div>

      {/* DEMO BADGE */}
      {stats.demo && (
        <p className="text-yellow-400 text-sm mt-4">
          Showing demo lap data (live race data unavailable)
        </p>
      )}

      {/* LAP INSIGHTS */}
      <div className="mt-6 bg-[#111827] p-4 rounded-lg border border-gray-800">
        <h3 className="font-bold mb-2">Lap Insights</h3>

        <p>🟢 Best Lap: {stats.bestLap}s</p>
        <p>🔴 Worst Lap: {stats.worstLap}s</p>
        <p>📊 Average Lap: {stats.avgLap}s</p>


        {stats.pitLaps?.length > 0 && (
          <p className="mt-1">
            🟡 Pit-affected laps: {stats.pitLaps.join(", ")}
          </p>
        )}
      </div>
      {/* LAP TIME CHART */}
      <LapTimeChart laps={laps} pitLaps={stats.pitLaps} />
    </div>
  );
}

export default DriverProfile;
