export const predictRaceOutcome = ({
  avgLap,
  consistencyScore,
  trackDifficulty = 1.0,
}) => {
  let score = 0;
  const reasons = [];

  // Lap pace (lower avg lap = better)
  if (avgLap && avgLap < 92) {
    score += 30;
    reasons.push("Strong lap pace");
  } else if (avgLap && avgLap < 96) {
    score += 20;
    reasons.push("Decent lap pace");
  }

  // Consistency
  if (consistencyScore > 0.2) {
    score += 30;
    reasons.push("High consistency");
  } else if (consistencyScore > 0.15) {
    score += 20;
    reasons.push("Moderate consistency");
  }

  // Track difficulty modifier
  score = score / trackDifficulty;

  // Clamp score
  score = Math.min(Math.max(score, 0), 100);

  // Convert score to prediction
  let predictedRange = "P10+";
  if (score > 70) predictedRange = "P1–P3";
  else if (score > 55) predictedRange = "P3–P6";
  else if (score > 40) predictedRange = "P6–P10";

  return {
    predictedRange,
    confidence: Number((score / 100).toFixed(2)),
    reasons,
  };
};
