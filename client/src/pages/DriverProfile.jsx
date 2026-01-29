import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function DriverProfile() {
  const { driverNumber } = useParams();
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/f1/drivers/${driverNumber}`)
      .then((res) => setDriver(res.data))
      .catch((err) => console.error(err));
  }, [driverNumber]);

  if (!driver) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back</Link>
      <h1>{driver.full_name}</h1>
      <p>Team: {driver.team_name}</p>
      <p>Country: {driver.country_code}</p>
      <p>Driver Number: {driver.driver_number}</p>
    </div>
  );
}

export default DriverProfile;
