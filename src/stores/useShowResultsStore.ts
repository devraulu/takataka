import create from 'zustand';

export interface ShowResultsStore {
	showResults: boolean;
	toggleResults: () => void;
	setResults: (show: boolean) => void;
}

const useShowResultsStore = create<ShowResultsStore>((set) => ({
	showResults: false,
	toggleResults: () => set((state) => ({ showResults: !state.showResults })),
	setResults: (show) => set((state) => ({ showResults: show })),
}));

export default useShowResultsStore;

