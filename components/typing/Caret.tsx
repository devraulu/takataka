import React, { useEffect } from 'react';
import { currentlyTypingIndexAtom, typedAtom } from '#root/atoms/typing';
import useIsTestActive from '#root/lib/hooks/useIsTestActive';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { motion, SpringOptions, useMotionValue, useSpring } from 'motion/react';

interface CaretProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    fontHeight: number;
}

const Caret: React.FunctionComponent<CaretProps> = ({
    containerRef,
    fontHeight,
}) => {
    const typed = useAtomValue(typedAtom);
    const currentlyTypingIndex = useAtomValue(currentlyTypingIndexAtom);
    const testActive = useIsTestActive();

    const topMotionValue = useMotionValue(0);
    const leftMotionValue = useMotionValue(0);

    const spring: SpringOptions = {
        mass: 0.2,
        stiffness: 500,
        damping: 20,
    };
    const top = useSpring(topMotionValue, spring);
    const left = useSpring(leftMotionValue, spring);

    useEffect(() => {
        if (typed?.[0].length == 0) {
            const firstLetter =
                containerRef.current?.querySelector('[data-letter]');
            if (firstLetter && firstLetter instanceof HTMLElement) {
                topMotionValue.set(firstLetter.offsetTop);
                leftMotionValue.set(firstLetter?.offsetLeft);
            }
        } else {
            const activeWord = containerRef.current?.querySelector(
                `[data-word][data-index="${typed.length - 1}"]`,
            );

            const activeLetter = activeWord?.querySelector(
                `[data-letter][data-index="${currentlyTypingIndex}"]`,
            );

            if (activeLetter && activeLetter instanceof HTMLElement) {
                const isTyped =
                    activeLetter?.getAttribute('data-typed') === 'true';

                const leftCalc = isTyped ? activeLetter.offsetWidth : 0;

                topMotionValue.set(activeLetter.offsetTop);

                leftMotionValue.set(activeLetter.offsetLeft + leftCalc);
            }
        }
    }, [typed, currentlyTypingIndex]);

    return (
        <motion.div
            className={clsx('absolute bg-caret', {
                'animate-blink': !testActive,
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
