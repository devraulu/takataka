import create from 'zustand';

export interface ShowResultsStore {
  showResults: boolean;
  toggleResults: (val?: boolean) => void;
  setResults: (show: boolean) => void;
}

const useShowResultsStore = create<ShowResultsStore>((set) => ({
  showResults: false,
  toggleResults: (val?: boolean) => set((state) => ({ showResults: val ?? !state.showResults })),
  setResults: (show) => set({ showResults: show }),
}));

export default useShowResultsStore;
