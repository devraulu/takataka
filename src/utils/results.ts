import Log, { WpmErrorLog } from '../models/Log';

export function computeWpmAndErrors(logsArr: Log[]): WpmErrorLog[] {
  // Initializations.
  let charCount = 0;
  let errorCount = 0;
  const logs = [...logsArr];
  const wpmLogs: WpmErrorLog[] = [];

  // Sort the logs by timestamp.
  logs.sort((a, b) => a.timestamp - b.timestamp);

  // Compute the first and last second.
  const firstSecond = Math.floor(logs[0]?.timestamp / 1000);
  const lastSecond = Math.floor(logs[logs.length - 1]?.timestamp / 1000);
  console.log('first, last', firstSecond, lastSecond);

  // Loop over each second and compute the WPM and errors.
  for (let second = firstSecond; second <= lastSecond; ++second) {
    // Count the characters and errors for this second.
    while (logs.length > 0 && Math.floor(logs[0].timestamp / 1000) == second) {
      const log = logs.shift();
      if (log?.character) ++charCount;
      if (log?.error) ++errorCount;
    }

    // Compute the raw and average WPM.
    const rawWpm = Math.floor((charCount / 5 / 1) * 60);
    const avgWpm =
      wpmLogs.length > 0
        ? Math.floor(
            wpmLogs?.map((item) => item.rawWpm)?.reduce((acc, item) => acc + item) / wpmLogs.length
          )
        : rawWpm;

    // Add this second's log to the array.
    wpmLogs.push({ second, rawWpm, avgWpm, errors: errorCount });

    // Reset the character and error counts for the next second.
    charCount = 0;
    errorCount = 0;
  }

  // console.log('finalLogs', wpmLogs);

  return wpmLogs.map((item, i) => ({ ...item, second: i + 1 }));
}

export function calculateAccuracy(logs: Log[]): number {
  let totalCharacters = 0;
  let totalErrors = 0;

  logs.forEach((log) => {
    if (log.character) {
      totalCharacters++;
      if (log.error) {
        totalErrors++;
      }
    }
  });

  const accuracy = ((totalCharacters - totalErrors) / totalCharacters) * 100;

  return accuracy;
}

export function calculateRawWpm(wpmLogs: WpmErrorLog[]) {
  const totalWpm = wpmLogs.reduce((acc, log) => {
    acc += log.rawWpm;
    return acc;
  }, 0);

  return totalWpm / wpmLogs.length;
}

export function calculateAvgWpm(wpmLogs: WpmErrorLog[]) {
  const totalWpm = wpmLogs.reduce((acc, log) => {
    acc += log.avgWpm;
    return acc;
  }, 0);

  return totalWpm / wpmLogs.length;
}

function calculateCoefficientOfVariation(values: number[]): number {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b) / n;
  const standardDeviation = Math.sqrt(
    values.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
  return (standardDeviation / mean) * 100;
}

export function calculateConsistency(wpmLogs: WpmErrorLog[]): number {
  const rawWpmValues = wpmLogs.map((log) => log.rawWpm);
  return calculateCoefficientOfVariation(rawWpmValues);
}

export function calculateStats(chartData: WpmErrorLog[], logs: Log[]) {
  const firstSecond = logs[0]?.timestamp / 1000;
  const lastSecond = logs[logs.length - 1]?.timestamp / 1000;

  return {
    accuracy: calculateAccuracy(logs),
    raw: calculateRawWpm(chartData),
    avg: calculateAvgWpm(chartData),
    consistency: calculateConsistency(chartData),
    time: lastSecond - firstSecond,
    correct: logs.filter((l) => !l.error && !l.extra).length,
    incorrect: logs.filter((l) => l.error).length,
    extra: logs.filter((l) => l.extra).length,
  };
}
