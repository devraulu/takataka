import ThemePicker from '../ThemePicker';
import { Button } from '../ui/button';
import { Asterisk, Github, Mail, Paintbrush } from 'lucide-react';
import SimpleTooltip from '../ui/simple-tooltip';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import clsx from 'clsx';
import useIsTestActive from '@/hooks/useIsTestActive';
import { useEffect } from 'react';

const btnClasses = 'text-sub hover:text-text';

function Footer() {
    const active = useIsTestActive();

    useEffect(() => {}, [active]);
    return (
        <AnimatePresence>
            {!active ? (
                <motion.div
                    key={'footer'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={clsx(
                        'py-3 grid grid-cols-2 gap-y-2 grid-rows-2 md:grid-cols-[auto_1fr_auto] md:grid-rows-1 md:place-content-center',
                    )}
                >
                    <div className='row-start-1 col-start-1 col-span-1'>
                        <Links />
                    </div>
                    <div className='row-start-1 col-start-2 col-span-1 justify-self-end md:col-start-3'>
                        <ThemePicker>
                            {open => (
                                <Button
                                    variant='link'
                                    className={btnClasses}
                                    onClick={open}
                                >
                                    <Paintbrush size={48} strokeWidth={2} />
                                </Button>
                            )}
                        </ThemePicker>
                    </div>

                    <div className='ps-3 md:ps-0 col-span-2 row-start-2 md:col-start-2 md:row-start-1 md:col-span-1 md:mx-auto'>
                        <CraftedBy />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

const Links = () => (
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
);

const CraftedBy = () => (
    <div className='copy text-xs md:text-sm text-sub mt-2 font-medium text-wrap items-center md:inline-flex md:gap-1'>
        <div className='flex flex-nowrap'>
            <p className=''>crafted by</p>
            <a
                className='link flex flex-nowrap items-center'
                href='https://rauluis.com'
                target='_blank'
            >
                <Asterisk strokeWidth={3.5} size={14} />
                Ra&uacute;l Luis.
            </a>
        </div>
        <p className='mt-1 md:mt-0'>
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
);
export default Footer;
