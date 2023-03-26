interface WordsProps {
	typed: string[];
	text: string;
}

const Words: React.FunctionComponent<WordsProps> = ({ typed, text }) => {
	return (
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
								const isTyped = typed.length > 0 && !!typed[i] && !!typed[i][j];
								const isCorrect = isTyped && letter === typed[i][j];
								const isExtraLetter = isExtra && j >= word.length;
								const isLastLetterBeingTyped =
									isLastWordBeingTyped && j === typed[i]?.length;

								return (
									<>
										{isLastLetterBeingTyped && <div className='caret '></div>}
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
								<div className='caret '></div>
							)}
						</div>
					</>
				);
			})}
		</div>
	);
};

export default Words;

