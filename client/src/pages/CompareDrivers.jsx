import { useEffect, useState } from "react";
import axios from "axios";
import DriverComparisonChart from "../components/DriverComparisonChart";

function CompareDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [driverA, setDriverA] = useState("");
  const [driverB, setDriverB] = useState("");

  useEffect(() => {
    axios.get("/api/f1/drivers").then((res) => setDrivers(res.data));
  }, []);

  const selectedA = drivers.find(d => d.driver_number == driverA);
  const selectedB = drivers.find(d => d.driver_number == driverB);

  return (
    <div className="min-h-screen bg-[#0b0f19] p-6 text-gray-200">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Driver Comparison
      </h1>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <select
          value={driverA}
          onChange={(e) => setDriverA(e.target.value)}
          className="bg-[#111827] border border-gray-700 px-4 py-2 rounded"
        >
          <option value="">Select Driver A</option>
          {drivers.map(d => (
            <option key={d.driver_number} value={d.driver_number}>
              {d.full_name}
            </option>
          ))}
        </select>

        <select
          value={driverB}
          onChange={(e) => setDriverB(e.target.value)}
          className="bg-[#111827] border border-gray-700 px-4 py-2 rounded"
        >
          <option value="">Select Driver B</option>
          {drivers.map(d => (
            <option key={d.driver_number} value={d.driver_number}>
              {d.full_name}
            </option>
          ))}
        </select>
      </div>

      {selectedA && selectedB && (
        <DriverComparisonChart driverA={selectedA} driverB={selectedB} />
      )}
    </div>
  );
}

export default CompareDrivers;
