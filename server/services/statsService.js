export const computeLapStats = (laps) => {
  const lapTimes = laps
    .map(l => l.lap_duration)
    .filter(Boolean);

  if (lapTimes.length === 0) {
    return {
      bestLap: null,
      avgLap: null,
      lapCount: 0,
    };
  }

  const bestLap = Math.min(...lapTimes);
  const avgLap =
    lapTimes.reduce((sum, l) => sum + l, 0) / lapTimes.length;

  return {
    bestLap: Number(bestLap.toFixed(2)),
    avgLap: Number(avgLap.toFixed(2)),
    lapCount: lapTimes.length,
  };
};

export const computeSmartLapInsights = (laps) => {
  const lapTimes = laps
    .map(l => l.lap_duration)
    .filter(Boolean);

  if (lapTimes.length === 0) {
    return {
      bestLap: null,
      worstLap: null,
      pitLaps: [],
    };
  }

  const avg =
    lapTimes.reduce((s, l) => s + l, 0) / lapTimes.length;

  const variance =
    lapTimes.reduce((s, l) => s + Math.pow(l - avg, 2), 0) /
    lapTimes.length;

  const stdDev = Math.sqrt(variance);

  const bestLap = Math.min(...lapTimes);
  const worstLap = Math.max(...lapTimes);

  const pitLaps = laps
    .filter(
      l =>
        l.lap_duration &&
        l.lap_duration > avg + 1.5 * stdDev
    )
    .map(l => l.lap_number);

  return {
    bestLap: Number(bestLap.toFixed(2)),
    worstLap: Number(worstLap.toFixed(2)),
    pitLaps,
  };
};

export const computeConsistencyScore = (laps) => {
  const lapTimes = laps
    .map(l => l.lap_duration)
    .filter(Boolean);

  if (lapTimes.length < 2) return null;

  const avg =
    lapTimes.reduce((s, l) => s + l, 0) / lapTimes.length;

  const variance =
    lapTimes.reduce((s, l) => s + Math.pow(l - avg, 2), 0) /
    lapTimes.length;

  const stdDev = Math.sqrt(variance);

  return Number((1 / stdDev).toFixed(4));
};
