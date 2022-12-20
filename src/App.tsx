import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { isLetter, isPunctuation, isSpace } from './utils';
import { useInterval } from 'usehooks-ts';

const text =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum, quam vitae rhoncus blandit, nisl magna lobortis erat, a interdum ipsum lacus in dui. Donec eget orci sit amet lectus porta placerat ut nec nisi. Duis at purus ex. Quisque dolor lectus, auctor ac tristique vitae, dignissim ac mi. Quisque a suscipit mauris. Maecenas urna nunc, malesuada sit amet finibus sit amet, sollicitudin nec nulla. Nullam at tellus auctor, euismod lectus eu, tincidunt eros.';

function App() {
	const [typed, setTyped] = useState<string[]>(['']);
	const [history, setHistory] = useState<string[]>([]);
	const [delay] = useState<number>(1000);
	const [isPlaying, setPlaying] = useState<boolean>(false);
	const [count, setCount] = useState(0);
	const [stop, setStop] = useState(true);

	useInterval(async () => {}, isPlaying && !stop ? delay : null);

	const handleKeys = useCallback(
		(e: KeyboardEvent) => {
			const key = e.key;

			if (isLetter(key) || isPunctuation(key)) {
				setTyped((prev) => {
					if (prev.length > 0) {
						const last = prev.slice(-1)[0] ?? '';
						return [...prev.slice(0, -1), last + key];
					}
					return [key];
				});
				setHistory((prev) => [...prev, key]);
			} else if (key === 'Backspace') {
				setTyped((prev) => {
					if (prev.length > 0) {
						// If there are any words typed, we get the last one
						let last = prev.slice(-1)[0];

						// If the last word is empty, we get the prev to last word
						// and only if it is wrongly typed we return it
						// (which the user will see as moving the cursor back to the previous word)

						if (last === '') {
							const typedPrevWord = prev.slice(-2)[0] ?? '';
							const prevWord = text.split(' ')[prev.length - 2] ?? '';
							console.log('prev to last', typedPrevWord, prevWord);

							if (typedPrevWord !== prevWord)
								return [...prev.slice(0, -2), typedPrevWord];
						}

						// Else we return the last word without the last letter
						return [...prev.slice(0, -1), last.slice(0, -1)];
					}
					return prev;
				});
				setHistory((prev) => [...prev, key]);
			} else if (isSpace(key)) {
				setHistory((prev) => [...prev, 'Space']);

				const prevPrevChar = history.slice(-2)[0];
				const prevChar = history.slice(-1)[0];

				if (prevChar === 'Space' && prevPrevChar === 'Space') {
				} else setTyped((prev) => [...prev, '']);
			}
		},
		[text, typed, history]
	);

	useEffect(() => {
		window.addEventListener('keyup', handleKeys);

		return () => {
			window.removeEventListener('keyup', handleKeys);
		};
	}, [text, typed, history, handleKeys]);

	return (
		<div className='App'>
			<div className='words'>
				{text.split(' ').map((word, i) => {
					const isTyped = typed.length > 0 && !!typed[i];
					const isComplete = isTyped && typed[i].length === word.length;
					const isLastWordBeingTypedStart = typed.length === i;
					const isLastWordBeingTyped = typed.length - 1 === i;

					const isWordCorrect = isTyped && typed[i] === word;
					const isExtra =
						typed.length > 0 && !!typed[i] && typed[i].length > word.length;
					const finalWord = isExtra ? word + typed[i].slice(word.length) : word;

					return (
						<>
							<div
								className={`word ${
									isTyped
										? isWordCorrect || isLastWordBeingTyped
											? ''
											: 'incomplete'
										: ''
								}`}>
								{finalWord.split('').map((letter, j) => {
									const isTyped =
										typed.length > 0 && !!typed[i] && !!typed[i][j];
									const isCorrect = isTyped && letter === typed[i][j];
									const isExtraLetter = isExtra && j >= word.length;
									const isLastLetterBeingTyped =
										isLastWordBeingTyped && j === typed[i]?.length;

									return (
										<>
											{isLastLetterBeingTyped && <div className='caret'></div>}
											<div
												className={`letter ${
													isTyped ? (isCorrect ? 'correct' : 'incorrect') : ''
												} ${isExtraLetter ? 'extra' : ''}`}>
												{letter}
											</div>
										</>
									);
								})}
								{isLastWordBeingTyped && isComplete && (
									<div className='caret'></div>
								)}
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}

export default App;

