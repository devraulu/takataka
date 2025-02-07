import themes from "#root/utils/themes";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage("theme", themes[0]);
export const savedThemeAtom = atomWithStorage("savedTheme", themes[0]);

export const showAfkOverlayAtom = atom(false);

export const closeAfkOverlayAtom = atom(null, (_, set) => set(showAfkOverlayAtom, false));
