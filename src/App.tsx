import { useEffect } from 'react';
import useTyping from './hooks/useTyping';
import Words from './components/Words';
import useShowResultsStore from './stores/useShowResultsStore';
import './App.scss';
import Results from './components/Results';

function App() {
	const { text, handleKeys, typed, count, reset } = useTyping();

	const { showResults, toggleResults } = useShowResultsStore();

	useEffect(() => {
		window.addEventListener('keyup', handleKeys);

		return () => {
			window.removeEventListener('keyup', handleKeys);
		};
	}, [text, typed, history, handleKeys]);

	return (
		<div className='container'>
			{!showResults ? (
				<>
					<div className=''>{count}</div>
					<Words typed={typed} text={text} />
				</>
			) : (
				<Results />
			)}
		</div>
	);
}

export default App;

