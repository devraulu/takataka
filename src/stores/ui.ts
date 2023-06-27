import create from 'zustand';
import { SingleShadeSwatch } from '../models/Theme';
import themes from '../utils/themes';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UIStore {
  theme: SingleShadeSwatch;
  setTheme: (theme: SingleShadeSwatch) => void;
  savedTheme?: SingleShadeSwatch;
  setSavedTheme: (theme: SingleShadeSwatch) => void;
}

// TODO: Persist configuration (theme, last test settings)

const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: themes[0],
      setTheme: (theme: SingleShadeSwatch) => set({ theme }),
      savedTheme: themes[0],
      setSavedTheme: (savedTheme: SingleShadeSwatch) => set({ savedTheme }),
    }),
    {
      name: 'ui-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ theme, savedTheme }) => ({
        theme,
        savedTheme,
      }),
    }
  )
);

export default useUIStore;
