import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { BrandGithub, Mail, Paint } from 'tabler-icons-react';
import ThemePicker from './ThemePicker';
import { useDisclosure } from '@mantine/hooks';

type FooterProps = unknown;

const Footer: React.FunctionComponent<FooterProps> = () => {
  const [showPicker, { open, close }] = useDisclosure();
  return (
    <Group mt={'auto'} py="md" position="apart">
      <Group>
        <Tooltip label="GitHub">
          <ActionIcon
            component="a"
            href="https://github.com/devRauLuis/takataka"
            target="_blank"
            rel="noopener"
            size="sm"
            color="tertiary"
          >
            <BrandGithub size={48} strokeWidth={2} />
          </ActionIcon>
        </Tooltip>{' '}
        <Tooltip label="Contact me">
          <ActionIcon component="a" href="mailto:soyrauluis@gmail.com" size="sm" color="tertiary">
            <Mail size={48} strokeWidth={2} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <ThemePicker show={showPicker} close={close}>
        <Tooltip label="Change theme">
          <ActionIcon size="sm" color="tertiary" onClick={open}>
            <Paint size={48} strokeWidth={2} />
          </ActionIcon>
        </Tooltip>
      </ThemePicker>
    </Group>
  );
};

export default Footer;
