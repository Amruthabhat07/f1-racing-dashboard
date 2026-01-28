import mongoose from "mongoose";

const raceSchema = new mongoose.Schema(
  {
    meeting_key: Number,
    meeting_name: String,
    location: String,
    country_name: String,
    date_start: String,
    year: Number
  },
  { timestamps: true }
);

export default mongoose.model("Race", raceSchema);
