import { currentlyTypingIndexAtom, typedAtom } from '@/atoms/typing';
import useIsTestActive from '@/hooks/useIsTestActive';
import { sleep } from '@/lib/utils/time';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { motion, SpringOptions, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useLayoutEffect, useState } from 'react';

interface CaretProps {
    containerRef: React.RefObject<HTMLDivElement>;
    fontHeight: number;
}

const Caret: React.FunctionComponent<CaretProps> = ({
    containerRef,
    fontHeight,
}) => {
    const typed = useAtomValue(typedAtom);
    const currentlyTypingIndex = useAtomValue(currentlyTypingIndexAtom);
    const testActive = useIsTestActive();

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    const topMotionValue = useMotionValue(0);
    const leftMotionValue = useMotionValue(0);

    const spring: SpringOptions = {
        mass: 0.2,
        stiffness: 460,
        damping: 20,
    };
    const top = useSpring(topMotionValue, spring);
    const left = useSpring(leftMotionValue, spring);

    const handleResize = () =>
        setDimensions({ height: window.innerHeight, width: window.innerWidth });

    const setInitialPosition = async (delay = 400) => {
        await sleep(delay);

        containerRef.current?.querySelector('letter');
        const rect = containerRef.current?.getBoundingClientRect();
        topMotionValue.set(rect?.top ?? 0);
        leftMotionValue.set(rect?.left ?? 0);
    };

    useEffect(() => {
        setInitialPosition();

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        };
    }, []);

    useLayoutEffect(() => {
        if (typed?.[0].length == 0) {
            setInitialPosition(0);
            return;
        }
        const activeWord = containerRef.current?.querySelector(
            `[data-word][data-index="${typed.length - 1}"]`,
        );

        const activeLetter = activeWord?.querySelector(
            `[data-letter][data-index="${currentlyTypingIndex}"]`,
        );

        const rect = activeLetter?.getBoundingClientRect();
        const isTyped = activeLetter?.getAttribute('data-typed') === 'true';

        if (!rect) return;
        const leftCalc = rect.left + (isTyped ? rect.width : 0);
        topMotionValue.set(rect.top);
        leftMotionValue.set(leftCalc);
    }, [typed, dimensions, currentlyTypingIndex]);

    return (
        <motion.div
            className={clsx('fixed bg-caret', {
                'animate-blink': !testActive,
                hidden: top.get() == 0,
            })}
            style={{
                top,
                left,
                height: fontHeight - 6,
                width: 2.5,
                opacity: 1,
            }}
        />
    );
};

export default Caret;
