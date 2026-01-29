import axios from "axios";

const OPENF1_BASE_URL = "https://api.openf1.org/v1";

export const fetchCurrentRaceDrivers = async () => {
  try {
    // 1️⃣ Fetch drivers from current season (not session-dependent)
    const driversRes = await axios.get(
      `${OPENF1_BASE_URL}/drivers`
    );

    // 2️⃣ Filter to realistic F1 race drivers
    const filtered = driversRes.data.filter(
      d =>
        d.driver_number &&
        d.team_name &&
        d.driver_number <= 99
    );

    // 3️⃣ Deduplicate by driver number
    const uniqueDrivers = Array.from(
      new Map(
        filtered.map(d => [d.driver_number, d])
      ).values()
    );

    // 4️⃣ Limit to ~20–25 drivers
    return uniqueDrivers.slice(0, 25);
  } catch (error) {
    console.error("OpenF1 driver fetch failed:", error.message);
    return [];
  }
};
