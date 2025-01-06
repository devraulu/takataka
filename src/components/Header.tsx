import { Flex, createStyles, rem } from '@mantine/core';
import Logo from './Logo';

const useStyles = createStyles(theme => ({
    container: {
        paddingTop: theme.spacing.sm,
        [theme.fn.largerThan('lg')]: {
            paddingTop: rem(24),
        },
    },
}));

function Header() {
    const { classes } = useStyles();
    return (
        <Flex justify={'center'} className={classes.container}>
            <Logo />
        </Flex>
    );
}

export default Header;
