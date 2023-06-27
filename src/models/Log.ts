export type WpmErrorLog = {
  second: number;
  rawWpm: number;
  avgWpm: number;
  errors: number;
};

type Log = {
  character?: string;
  timestamp: number;
  error: boolean;
  extra?: boolean;
};

export default Log;
