import create from 'zustand';

export interface TimerStore {
    isPlaying: boolean;
    setPlaying: (isPlaying: boolean) => void;

    count: number;
    initialCount: number;
    setCount: (count: number) => void;
    decreaseCount: () => void;
    resetCount: () => void;
}

const useTimerStore = create<TimerStore>(set => ({
    initialCount: 60,
    count: 60,
    isPlaying: false,
    setPlaying: (isPlaying: boolean) => set(state => ({ isPlaying })),
    setCount: count => set(state => ({ count })),
    decreaseCount: () => set(state => ({ count: state.count - 1 })),
    resetCount: () => set(state => ({ count: state.initialCount })),
}));

export default useTimerStore;
