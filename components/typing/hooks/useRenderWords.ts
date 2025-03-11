import { findActiveLineIndex, fitsInCurrentLine } from '#root/lib/utils/words';
import { useAtomValue } from 'jotai';
import { checkedWordsAtom, textAtom, typedAtom } from '#root/atoms/typing';

const useRenderWords = (fontWidth: number, containerWidth: number) => {
    const typed = useAtomValue(typedAtom);
    const text = useAtomValue(textAtom).split(' ');
    const checkedWords = useAtomValue(checkedWordsAtom);

    const lines = text.reduce(
        (acc: string[][], item: string) => {
            if (acc.length < 1) acc.push([]);

            // If the current word fits in the current line without surpassing the width of the container we add it
            // to the current line
            if (
                fitsInCurrentLine(
                    item,
                    acc[acc.length - 1],
                    fontWidth,
                    containerWidth,
                )
            ) {
                acc[acc.length - 1].push(item);
            } else {
                acc.push([item]);
            }

            return acc;
        },
        [[]],
    );

    const activeLine = findActiveLineIndex(lines, typed.length);

    // Get the start and end indices for slicing the array
    const start = activeLine > 0 ? activeLine - 1 : 0;
    const end = activeLine > 0 ? activeLine + 2 : 3;

    const startWordsIndex = lines
        .slice(0, start)
        .reduce((acc, elem) => (acc += elem.length), 0);

    const endWordsIndex = lines.slice(0, end).reduce((acc, elem) => {
        return (acc += elem.length);
    }, 0);

    // Return the relevant lines
    const wordsToRender = checkedWords.slice(startWordsIndex, endWordsIndex);

    return wordsToRender;
};

export default useRenderWords;
