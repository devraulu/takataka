import { Box, Flex, createStyles, rem } from '@mantine/core';
import Logo from './Logo';

interface HeaderProps {}

const useStyles = createStyles(theme => ({
    container: {
        paddingTop: theme.spacing.sm,
        [theme.fn.largerThan('lg')]: {
            paddingTop: rem(24),
        },
    },
}));

const Header: React.FunctionComponent<HeaderProps> = () => {
    const { classes } = useStyles();
    return (
        <Flex justify={'center'} className={classes.container}>
            <Logo />
        </Flex>
    );
};

export default Header;
