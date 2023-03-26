import { useState, useCallback } from 'react';
import { useInterval } from 'usehooks-ts';
import useShowResultsStore from '../stores/useShowResultsStore';
import useTimerStore from '../stores/useTimerStore';
import useTypingStore from '../stores/useTypingStore';
import { isLetter, isPunctuation, isSpace } from '../utils';

const useTyping = () => {
	const { count, isPlaying, setPlaying, setCount, decreaseCount, resetCount } =
		useTimerStore();

	const { toggleResults, setResults } = useShowResultsStore();

	const { text, initialTyped, typed, history, setTyped, setHistory } =
		useTypingStore();

	useInterval(
		async () => {
			if (count == 1) {
				setPlaying(false);
				setCount(0);
				toggleResults();
				return;
			}
			decreaseCount();
		},
		isPlaying && count > 0 ? 1000 : null
	);

	const handleKeys = useCallback(
		(e: KeyboardEvent) => {
			const key = e.key;

			if (isLetter(key) || isPunctuation(key)) {
				if (typed == initialTyped) setPlaying(true);

				if (typed.length > 0) {
					const last = typed.slice(-1)[0] ?? '';
					setTyped([...typed.slice(0, -1), last + key]);
				} else setTyped([key]);

				setHistory([...history, key]);
			} else if (key === 'Backspace') {
				console.log('currently typed after pressing backspaced', typed);
				if (typed.length > 0) {
					// If there are any words typed, we get the last one
					let last = typed.slice(-1)[0];

					// If the last word is empty, we get the prev to last word
					// and only if it is wrongly typed we return it
					// (which the user will see as moving the cursor back to the previous word)

					if (last === '') {
						const typedPrevWord = typed.slice(-2)[0] ?? '';
						const prevWord = text.split(' ')[typed.length - 2] ?? '';
						console.log('prev to last', typedPrevWord, prevWord);

						if (typedPrevWord !== prevWord)
							setTyped([...typed.slice(0, -2), typedPrevWord]);
						return;
					}

					// Else we return the last word without the last letter
					setTyped([...typed.slice(0, -1), last.slice(0, -1)]);
				}
				//  else setTyped(typed);

				setHistory([...history, key]);
			} else if (isSpace(key)) {
				setHistory([...history, 'Space']);

				const prevPrevChar = history.slice(-2)[0];
				const prevChar = history.slice(-1)[0];

				if (prevChar === 'Space' && prevPrevChar === 'Space') {
				} else setTyped([...typed, '']);
			}
		},
		[text, typed, history]
	);

	const reset = () => {
		setTyped(initialTyped);
		resetCount();
		setPlaying(false);
		setResults(false);
	};

	return {
		text,
		typed,
		handleKeys,
		count,
		isPlaying,
		reset,
	};
};

export default useTyping;

