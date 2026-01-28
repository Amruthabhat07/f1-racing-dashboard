import express from "express";
import cors from "cors";
import f1Routes from "./routes/f1Routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/f1", f1Routes);

app.get("/", (req, res) => {
  res.send("F1 Racing Dashboard API is running");
});

export default app;


