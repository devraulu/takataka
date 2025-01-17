import ThemePicker from '../ThemePicker';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { Asterisk, Github, Mail, Paintbrush } from 'lucide-react';

function Footer() {
    const btnClasses = 'text-sub hover:text-text';

    return (
        <div className='flex justify-between py-6'>
            <div className='flex gap-2'>
                <SimpleTooltip
                    label='GitHub'
                    children={
                        <Button variant='link' className={btnClasses} asChild>
                            <a
                                href='https://github.com/devraulu/takataka'
                                target='_blank'
                                rel='noopener'
                            >
                                <Github size={48} strokeWidth={2} />
                            </a>
                        </Button>
                    }
                />
                <SimpleTooltip label='Contact me'>
                    <Button variant='link' className={btnClasses} asChild>
                        <a href='mailto:me@rauluis.com'>
                            <Mail size={48} strokeWidth={2} />
                        </a>
                    </Button>
                </SimpleTooltip>
            </div>

            <div className='copy text-sub mt-2 font-medium text-wrap flex items-center gap-1'>
                <p className=''>crafted by</p>
                <a
                    className='link flex items-center'
                    href='https://rauluis.com'
                    target='_blank'
                >
                    <Asterisk strokeWidth={3.5} size={14} />
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
            </div>

            <ThemePicker>
                <SimpleTooltip label='Change theme'>
                    <Button variant='link' className={btnClasses}>
                        <Paintbrush size={48} strokeWidth={2} />
                    </Button>
                </SimpleTooltip>
            </ThemePicker>
        </div>
    );
}

type SimpleTooltipProps = {
    children: React.ReactNode;
    label: string | React.ReactNode;
};

const SimpleTooltip = ({ children, label }: SimpleTooltipProps) => (
    <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
    </Tooltip>
);

export default Footer;
