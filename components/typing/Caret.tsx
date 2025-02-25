import React from 'react';
import { currentlyTypingIndexAtom, typedAtom } from '#root/atoms/typing';
import useIsTestActive from '#root/lib/hooks/useIsTestActive';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import {
    SequenceOptions,
    SpringOptions,
    TargetAndTransition,
    useAnimate,
} from 'motion/react';

interface CaretProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    fontHeight: number;
}

const springOptions: SpringOptions = {
    mass: 0.2,
    stiffness: 300,
    damping: 40,
};

const initialAnimation: TargetAndTransition = {
    left: 0,
    top: 0,
    opacity: [null, 0, 1],
    transition: {
        repeat: Infinity,
        duration: 1,
    },
};

const initialOptions: SequenceOptions = {
    repeat: Infinity,
    duration: 1,
};

const movingOptions: SequenceOptions = {
    repeat: undefined,
};

const Caret: React.FunctionComponent<CaretProps> = ({
    containerRef,
    fontHeight,
}) => {
    const typed = useAtomValue(typedAtom);
    const currentlyTypingIndex = useAtomValue(currentlyTypingIndexAtom);
    const testActive = useIsTestActive();

    const [scope, animate] = useAnimate();

    React.useEffect(() => {
        let animation = initialAnimation;
        let options = initialOptions;

        if (typed?.[0].length == 0) {
            const firstLetter =
                containerRef.current?.querySelector('[data-letter]');
            if (firstLetter && firstLetter instanceof HTMLElement) {
                animation = {
                    opacity: 1,
                    top: firstLetter.offsetTop,
                    left: firstLetter?.offsetLeft,
                };

                options = movingOptions;
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

                animation = {
                    opacity: 1,
                    top: activeLetter.offsetTop,
                    left: activeLetter.offsetLeft + leftCalc,
                };
                options = movingOptions;
            }
        }

        console.log('animation', animation, options);
        const controls = animate([[scope.current, animation]], options);

        return () => controls.stop();
    }, [typed, currentlyTypingIndex, containerRef, scope, testActive]);

    return (
        <div
            ref={scope}
            className={clsx('absolute bg-caret')}
            style={{
                height: fontHeight - 6,
                width: 2.5,
            }}
        />
    );
};

export default Caret;
