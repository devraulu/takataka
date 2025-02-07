export const getDifferenceInSeconds = (date1: number, date2: number) => {
    const diff = Math.abs(date2 - date1);

    return diff / 1000;
};

export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));
