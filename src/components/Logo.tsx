import { Box, Text, Title, rem, useMantineTheme } from '@mantine/core';
import useResetTest from '../hooks/useResetTest';
import useIsTestFinished from '../hooks/useIsTestFinished';
import { useAtomValue } from 'jotai';
import { hasTestStartedAtom } from '../atoms/typing';
import { motion } from 'motion/react';

interface LogoProps {}

const Logo: React.FunctionComponent<LogoProps> = () => {
    const hasTestStarted = useAtomValue(hasTestStartedAtom);
    const { newTest } = useResetTest();
    const theme = useMantineTheme();
    theme.colors[theme.primaryColor];
    const isTestFinished = useIsTestFinished();

    const showAnimation = hasTestStarted && !isTestFinished;

    const mainTextVariants = {
        active: {
            opacity: 1,
            color: theme.colors.secondary['5'],
        },
        inactive: {
            opacity: 0.5,
            color: theme.colors.tertiary['5'],
        },
    };

    const smallTextVariants = {
        active: {
            opacity: 1,
            color: theme.colors.secondary['5'],
        },
        inactive: {
            opacity: 0,
        },
    };

    const animate = showAnimation ? 'inactive' : 'active';

    return (
        <Box className='select-none'>
            <motion.div variants={smallTextVariants} animate={animate}>
                <Text
                    fz={rem(12)}
                    fw={600}
                    sx={{ fontFamily: 'Montserrat, sans-serif' }}
                    pl='xs'
                    opacity={0.6}
                    color={'tertiary'}
                >
                    keys go
                </Text>
            </motion.div>
            <motion.div
                variants={mainTextVariants}
                animate={animate}
                style={{
                    cursor: 'pointer',
                }}
                onClick={newTest}
            >
                <Title
                    order={1}
                    fz={rem(50)}
                    lh={0.8}
                    fw={600}
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    takataka
                </Title>
            </motion.div>
        </Box>
    );
};

export default Logo;
