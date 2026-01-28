import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    driver_number: Number,
    full_name: String,
    name_acronym: String,
    team_name: String,
    country_code: String,
    broadcast_name: String
  },
  { timestamps: true }
);

export default mongoose.model("Driver", driverSchema);
