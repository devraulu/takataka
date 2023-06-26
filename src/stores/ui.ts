import create from 'zustand';
import ThemeSwatch, { SingleShadeSwatch } from '../models/Theme';
import themes from '../utils/themes';

export interface UIStore {
    theme: SingleShadeSwatch;
    setTheme: (theme: SingleShadeSwatch) => void;
    savedTheme?: SingleShadeSwatch;
    setSavedTheme: (theme: SingleShadeSwatch) => void;
}

// TODO: Persist configuration (theme, last test settings)

const useUIStore = create<UIStore>((set, get) => ({
    theme: themes[0],
    setTheme: (theme: SingleShadeSwatch) => set({ theme }),
    savedTheme: themes[0],
    setSavedTheme: (savedTheme: SingleShadeSwatch) => set({ savedTheme }),
}));

export default useUIStore;
