import themes from '../utils/themes';
import { atomWithStorage } from 'jotai/utils';

const themeAtom = atomWithStorage('theme', themes[0]);
const savedThemeAtom = atomWithStorage('savedTheme', themes[0]);

export { themeAtom, savedThemeAtom };
