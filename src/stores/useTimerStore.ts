import { produce } from 'immer';
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
    initialCount: 90,
    count: 90,
    isPlaying: false,
    setPlaying: (isPlaying: boolean) =>
        set(
            produce(state => {
                state.isPlaying = isPlaying;
            })
        ),
    setCount: count =>
        set(
            produce(state => {
                state.count = count;
            })
        ),
    decreaseCount: () => {
        set(
            produce(state => {
                state.count -= 1;
            })
        );
    },
    resetCount: () =>
        set(
            produce(state => {
                state.count = state.initialCount;
            })
        ),
}));

export default useTimerStore;
