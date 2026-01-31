import axios from "axios";
import {
  computeLapStats,
  computeSmartLapInsights,
  computeConsistencyScore,
} from "./statsService.js";

const OPENF1_BASE_URL = "https://api.openf1.org/v1";
const raceMomentumCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const fetchDriverLapStats = async (driverNumber) => {
  try {
    // 1️⃣ Get latest meeting
    const meetingsRes = await axios.get(
      `${OPENF1_BASE_URL}/meetings`
    );

    if (!meetingsRes.data.length) {
      throw new Error("No meetings available");
    }

    const latestMeeting = meetingsRes.data.at(-1);

    // 2️⃣ Get sessions
    const sessionsRes = await axios.get(
      `${OPENF1_BASE_URL}/sessions?meeting_key=${latestMeeting.meeting_key}`
    );

    // 3️⃣ Find race-like session
    const raceSession = sessionsRes.data.find(
      s => s.session_name?.toLowerCase().includes("race")
    );

    if (!raceSession) {
      throw new Error("No race session found");
    }

    // 4️⃣ Fetch laps
    const lapsRes = await axios.get(
      `${OPENF1_BASE_URL}/laps?session_key=${raceSession.session_key}&driver_number=${driverNumber}`
    );

    // 5️⃣ Filter realistic laps
    const validLaps = lapsRes.data.filter(
      l =>
        l.lap_duration &&
        l.lap_duration > 60 &&
        l.lap_duration < 200
    );

    // 6️⃣ DEMO fallback if no valid laps
    if (validLaps.length === 0) {
      throw new Error("No valid laps");
    }

    // ✅ REAL DATA RETURN
    return {
      ...computeLapStats(validLaps),
      ...computeSmartLapInsights(validLaps),
      consistencyScore: computeConsistencyScore(validLaps),
      demo: false,
    };

  } catch (error) {
    console.warn("Lap stats demo fallback:", error.message);

    // ✅ ALWAYS return demo data on ANY failure
    const demoLaps = Array.from({ length: 55 }, (_, i) => ({
      lap_number: i + 1,
      lap_duration: 88 + Math.random() * 6,
    }));

    return {
      ...computeLapStats(demoLaps),
      ...computeSmartLapInsights(demoLaps),
      consistencyScore: computeConsistencyScore(demoLaps),
      demo: true,
    };
  }
};




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

//find race momentum in each lap -position

export const fetchDriverRaceMomentum = async (driverNumber) => {
  const cached = raceMomentumCache.get(driverNumber);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // 1️⃣ Get latest meeting
    const meetingsRes = await axios.get(
      `${OPENF1_BASE_URL}/meetings`
    );

    if (!meetingsRes.data.length) return [];

    const latestMeeting = meetingsRes.data.at(-1);
    const meetingKey = latestMeeting.meeting_key;

    // 2️⃣ Get race session
    const sessionsRes = await axios.get(
      `${OPENF1_BASE_URL}/sessions?meeting_key=${meetingKey}`
    );

    const raceSession = sessionsRes.data.find(s =>
      s.session_name?.toLowerCase().includes("race")
    );

    if (!raceSession) return [];

    // 3️⃣ Fetch laps
    const lapsRes = await axios.get(
      `${OPENF1_BASE_URL}/laps?session_key=${raceSession.session_key}&driver_number=${driverNumber}`
    );

    const data = lapsRes.data
      .filter(l => l.lap_number && l.position)
      .map(l => ({
        lap: l.lap_number,
        position: l.position,
      }))
      .sort((a, b) => a.lap - b.lap);

    // ✅ Cache result
    raceMomentumCache.set(driverNumber, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn("OpenF1 rate limit hit — using fallback");
    } else {
      console.error("Race momentum error:", error.message);
    }
    return [];
  }
};

    


