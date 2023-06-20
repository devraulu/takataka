function calculateWpm(logs) {
    const totalWords = logs.length; // Assumes words are separated by spaces
    const totalTime = logs[logs.length - 1].timestamp / 60; // Converts seconds to minutes
    const wpm = totalWords / totalTime;
    return wpm;
}

function calculateErrors(logs) {
    const totalErrors = logs.filter(log => log.error).length;
    return totalErrors;
}

export function createChartData(logs) {
    const chartData = logs.map((log, index) => {
        const logsUpToCurrent = logs.slice(0, index + 1);
        const wpm = calculateWpm(logsUpToCurrent);
        const errors = calculateErrors(logsUpToCurrent);

        // console.log('logsUpToCurrent', logsUpToCurrent);

        return {
            counterstamp: log.counterstamp,
            wpm,
            errors,
        };
    });
    return chartData;
}
