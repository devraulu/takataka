import { useMemo } from 'react';
import {
    findActiveLineIndex,
    fitsInCurrentLine,
    checkWords,
} from '../utils/words';
import useTypingStore from '../stores/typing';
import { Word } from '../models/Word';

const useRenderWords = (fontWidth: number, containerWidth: number) => {
    const [text, typed] = useTypingStore(state => [state.text, state.typed]);

    const splitText = text.split(' ');

    const checkedWords = checkWords(splitText, typed);

    const lines = checkedWords.reduce(
        (acc: Word[][], item: Word) => {
            if (acc.length < 1) acc.push([]);
            const currentLine = acc[acc.length - 1];

            // If the current word fits in the current line without surpassing the width of the container we add it
            // to the current line
            if (
                fitsInCurrentLine(item, currentLine, fontWidth, containerWidth)
            ) {
                currentLine.push(item);
                return [...acc.slice(0, acc.length - 1), currentLine];
            } else return [...acc, [item]];
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
    const endWordsIndex = lines
        .slice(0, end)
        .reduce((acc, elem) => (acc += elem.length), 0);

    // Return the relevant lines

    const wordsToRender = useMemo(() => {
        return checkedWords.slice(startWordsIndex, endWordsIndex);
    }, [checkedWords, lines]);

    console.log('re checked words');

    return wordsToRender;
};

export default useRenderWords;
