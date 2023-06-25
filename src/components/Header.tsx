import { Box, Flex } from '@mantine/core';
import Logo from './Logo';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
    return (
        <Flex justify={'center'}>
            <Logo />
        </Flex>
    );
};

export default Header;
