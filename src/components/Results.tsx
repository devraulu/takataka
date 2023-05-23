import { ActionIcon, Box, Title } from '@mantine/core';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import useTyping from '../hooks/useTyping';

interface ResultsProps {}

const Results: React.FunctionComponent<ResultsProps> = () => {
    const { reset } = useTyping();

    return (
        <Box>
            <Title fz='lg'>Results</Title>
            <ActionIcon onClick={reset} size={'sm'}>
                <ArrowUturnLeftIcon />
            </ActionIcon>
        </Box>
    );
};

export default Results;
