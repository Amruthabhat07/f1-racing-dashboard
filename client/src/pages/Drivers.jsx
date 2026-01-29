import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get("/api/f1/drivers");
        setDrivers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading drivers...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Formula 1 Drivers</h1>
      <p>Count: {drivers.length}</p>

      <ul>
        {drivers.map((driver) => (
          <li key={driver.driver_number}>
            <Link to={`/drivers/${driver.driver_number}`}>
              {driver.full_name} — {driver.team_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drivers;
