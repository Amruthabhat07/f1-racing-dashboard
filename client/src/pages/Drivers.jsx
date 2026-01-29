import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("All");

  useEffect(() => {
    axios
      .get("/api/f1/drivers")
      .then((res) => {
  const raceDrivers = res.data.filter(
    (d) => d.driver_number && d.team_name
  );
  setDrivers(raceDrivers);
})

      .catch((err) => console.error(err));
  }, []);

  // unique teams for dropdown
  const teams = ["All", ...new Set(drivers.map((d) => d.team_name))];

  // filter logic
  const filteredDrivers = drivers.filter((driver) => {
    const matchesName = driver.full_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTeam =
      team === "All" || driver.team_name === team;

    return matchesName && matchesTeam;
  });

return (
  <div className="min-h-screen bg-[#0b0f19] p-6 text-gray-200">
    <h1 className="text-4xl font-extrabold text-center mb-2 text-red-600">
      Formula 1 Drivers
    </h1>

    <p className="text-center text-gray-400 mb-8">
      High-performance racing analytics dashboard
    </p>

    {/* Controls */}
    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
      <input
        type="text"
        placeholder="Search driver..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 rounded bg-[#111827] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600"
      />

      <select
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="px-4 py-2 rounded bg-[#111827] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        {teams.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>

    <p className="text-center text-gray-400 mb-6">
      Showing {filteredDrivers.length} drivers
    </p>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredDrivers.map((driver) => (
        <Link
          key={driver.driver_number}
          to={`/drivers/${driver.driver_number}`}
          className="bg-[#111827] rounded-xl p-5 border border-gray-800 hover:border-red-600 transition"
        >
          <h2 className="text-xl font-bold mb-1">
            {driver.full_name}
          </h2>
          <p className="text-gray-400">{driver.team_name}</p>
          <p className="text-sm text-gray-500 mt-2">
            #{driver.driver_number} • {driver.country_code}
          </p>
        </Link>
      ))}
    </div>
  </div>
);
}

export default Drivers;

