import { ActionIcon, Group, useMantineTheme, Tooltip } from '@mantine/core';
import { BrandGithub, Mail, Paint, Asterisk } from 'tabler-icons-react';
import ThemePicker from './ThemePicker';
import { useDisclosure } from '@mantine/hooks';

interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = () => {
    const theme = useMantineTheme();
    const [showPicker, { open, close }] = useDisclosure();

    return (
        <Group mt={'auto'} py='md' position='apart'>
            <Group>
                <Tooltip label='GitHub'>
                    <ActionIcon
                        component='a'
                        href='https://github.com/devRauLuis/takataka'
                        target='_blank'
                        rel='noopener'
                        size='sm'
                        color='tertiary'
                    >
                        <BrandGithub size={48} strokeWidth={2} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label='Contact me'>
                    <ActionIcon
                        component='a'
                        href='mailto:me@rauluis.com'
                        size='sm'
                        color='tertiary'
                    >
                        <Mail size={48} strokeWidth={2} />
                    </ActionIcon>
                </Tooltip>
            </Group>

            <Group
                sx={{
                    color: theme.colors.tertiary['6'],
                }}
                className='copy mt-2 font-medium text-wrap flex items-center gap-1'
            >
                <p className=''>crafted by</p>
                <Asterisk strokeWidth={5.5} size={12} />
                <a className='link' href='https://rauluis.com' target='_blank'>
                    Ra&uacute;l Luis.
                </a>
                <p className=''>
                    heavily inspired by{' '}
                    <a
                        href='https://monkeytype.com/'
                        target='_blank'
                        rel='noopener'
                        className='link'
                    >
                        monkeytype.
                    </a>
                </p>
            </Group>

            <ThemePicker show={showPicker} close={close}>
                <Tooltip label='Change theme'>
                    <ActionIcon size='sm' color='tertiary' onClick={open}>
                        <Paint size={48} strokeWidth={2} />
                    </ActionIcon>
                </Tooltip>
            </ThemePicker>
        </Group>
    );
};

export default Footer;
