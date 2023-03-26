interface ResultsProps {}

const Results: React.FunctionComponent<ResultsProps> = () => {
	return (
		<div className='results flex items-end content-center'>
			<p className='text-4xl'>results</p>
			<button
				className=' border-2 border-blue-600'
				// onClick={() => reset()}
			>
				new
			</button>
		</div>
	);
};

export default Results;

