import create from 'zustand';

const INITIAL_TYPED = [''];

export const SAMPLE_TEXT =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum, quam vitae rhoncus blandit, nisl magna lobortis erat, a interdum ipsum lacus in dui. Donec eget orci sit amet lectus porta placerat ut nec nisi. Duis at purus ex. Quisque dolor lectus, auctor ac tristique vitae, dignissim ac mi. Quisque a suscipit mauris. Maecenas urna nunc, malesuada sit amet finibus sit amet, sollicitudin nec nulla. Nullam at tellus auctor, euismod lectus eu, tincidunt eros.';

export interface TypingStore {
	initialTyped: string[];
	typed: string[];
	setTyped: (typed: string[]) => void;
	history: string[];
	setHistory: (history: string[]) => void;
	text: string;
	setText: (text: string) => void;
}

const useTypingStore = create<TypingStore>((set, get) => ({
	initialTyped: INITIAL_TYPED,
	typed: INITIAL_TYPED,
	setTyped: (typed: string[]) => set((state) => ({ typed })),
	history: [],
	setHistory: (history: string[]) => set((state) => ({ history })),
	text: SAMPLE_TEXT,
	setText: (text: string) => set((state) => ({ text })),
}));

export default useTypingStore;

