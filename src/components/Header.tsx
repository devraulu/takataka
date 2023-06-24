import { Box, Flex } from '@mantine/core';
import Logo from './Logo';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
    return (
        <Flex justify={'center'}>
            <Box w='50%'>
                <Logo />
            </Box>
        </Flex>
    );
};

export default Header;
