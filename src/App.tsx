import { useEffect, useState } from 'react';
import './App.css';
import { isLetter, isPunctuation, isSpace } from './utils';
import { useInterval } from 'usehooks-ts';

const text =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum, quam vitae rhoncus blandit, nisl magna lobortis erat, a interdum ipsum lacus in dui. Donec eget orci sit amet lectus porta placerat ut nec nisi. Duis at purus ex. Quisque dolor lectus, auctor ac tristique vitae, dignissim ac mi. Quisque a suscipit mauris. Maecenas urna nunc, malesuada sit amet finibus sit amet, sollicitudin nec nulla. Nullam at tellus auctor, euismod lectus eu, tincidunt eros.';

function App() {
	const [typed, setTyped] = useState<string[]>([]);
	const [history, setHistory] = useState('');
	const [delay] = useState<number>(1000);
	const [isPlaying, setPlaying] = useState<boolean>(false);
	const [count, setCount] = useState(0);
	const [stop, setStop] = useState(true);
	useInterval(async () => {}, isPlaying && !stop ? delay : null);

	const handleKeys = (e: KeyboardEvent) => {
		const key = e.key;

		setHistory((prev) => prev + key);

		if (isLetter(key) || isPunctuation(key)) {
			setTyped((prev) => {
				if (prev.length > 0) {
					const last = prev.slice(-1)[0] ?? '';
					return [...prev.slice(0, -1), last + key];
				}
				return [key];
			});
		} else if (key === 'Backspace') {
			setTyped((prev) => {
				if (prev.length > 0) {
					let last = prev.slice(-1)[0] ?? '';
					if (last === '') {
						const typedPrevWord = prev.slice(-2)[0] ?? '';
						const prevWord = text.split(' ').slice(-2)[0] ?? '';
						if (typedPrevWord !== prevWord) {
							last = typedPrevWord;
						}
						return [...prev.slice(0, -2), last];
					}

					return [...prev.slice(0, -1), last.slice(0, -1)];
				}
				return [];
			});
		} else if (isSpace(key)) {
			if (isSpace(history[history.length - 2])) {
			} else setTyped((prev) => [...prev, '']);
		}
	};

	useEffect(() => {
		window.addEventListener('keyup', handleKeys);

		return () => {
			window.removeEventListener('keyup', handleKeys);
		};
	}, []);

	return (
		<div className='App' onKeyUpCapture={(e) => console.log('key: ' + e.key)}>
			<div className='words'>
				{text.split(' ').map((word, i) => {
					const isTyped = typed.length > 0 && !!typed[i];
					const isComplete = isTyped && typed[i].length === word.length;
					const isExtra =
						typed.length > 0 && !!typed[i] && typed[i].length > word.length;
					const finalWord = isExtra ? word + typed[i].slice(word.length) : word;

					return (
						<div
							className={`word ${
								isTyped ? (isComplete ? '' : 'incomplete') : ''
							}`}>
							{finalWord.split('').map((letter, j) => {
								const isTyped = typed.length > 0 && !!typed[i] && !!typed[i][j];
								const isCorrect = isTyped && letter === typed[i][j];
								const isExtraLetter = isExtra && j >= word.length;
								return (
									<div
										className={`letter ${
											isTyped ? (isCorrect ? 'correct' : 'incorrect') : ''
										} ${isExtraLetter ? 'extra' : ''}`}>
										{letter}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;

