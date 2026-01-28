import axios from "axios";

const BASE_URL = "https://api.openf1.org/v1";

// Get all drivers
export const fetchDrivers = async () => {
  const response = await axios.get(`${BASE_URL}/drivers`);
  return response.data;
};

// Get race meetings (Grand Prix)
export const fetchRaces = async () => {
  const response = await axios.get(`${BASE_URL}/meetings`);
  return response.data;
};
