import { Global } from '@mantine/core';

interface MantineGlobalProps {}

const MantineGlobal: React.FunctionComponent<MantineGlobalProps> = () => {
    return (
        <Global
            styles={theme => ({
                '*, *::before, *::after': {
                    boxSizing: 'border-box',
                },

                body: {
                    ...theme.fn.fontStyles(),
                    backgroundColor: theme.colors.background[5],
                    color: theme.colors.secondary,
                    // lineHeight: theme.lineHeight,
                },

                // '.your-class': {
                //     backgroundColor: 'red',
                // },

                // '#your-id > [data-active]': {
                //     backgroundColor: 'pink',
                // },
            })}
        />
    );
};

export default MantineGlobal;
