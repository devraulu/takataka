import { Letter, Word } from '@/models/Word';

export function fitsInCurrentLine(
    word: Word,
    line: Word[],
    fontWidth: number,
    containerWidth: number,
) {
    // We calculate the width of the word using the width of the current font at it's current size
    // and multiply it by the length of the word plus one space

    const wordWidth = (word.word.length + 1) * fontWidth;

    // To know the width of the line we calculate the width of each word,
    //  then add each width
    const lineWidth = line.reduce(
        (acc, item) => acc + (item.word.length + 1) * fontWidth,
        0,
    );

    return lineWidth + wordWidth <= containerWidth;
}

export function findActiveLineIndex(
    lines: Word[][],
    currentTypingIndex: number,
) {
    const index = lines.findIndex((elem, i, arr) => {
        const previousLinesSize = arr
            .slice(0, i)
            .reduce((acc, elem) => (acc += elem.length), 0);

        const isCurrentLine =
            currentTypingIndex > previousLinesSize &&
            currentTypingIndex <= previousLinesSize + elem.length;

        return isCurrentLine;
    });

    return index;
}

export function checkWord(
    word: string,
    typed: string,
    index: number,
    active = true,
) {
    const typedNotEmpty = typed?.length > 0;
    const isTyped = typedNotEmpty && !!typed;
    const isComplete = isTyped && typed.length === word.length;

    const isWordCorrect = typed === word;
    const isExtra = typedNotEmpty && !!typed && typed.length > word.length;
    const finalWordStr = `${word}${typed?.slice(word.length) ?? ''}`;

    const finalWord = finalWordStr.split('').map((letter, j) => {
        const isTyped = typedNotEmpty && !!typed[j];
        const isCorrect = isTyped && letter === typed[j];
        const isExtraLetter = isExtra && j >= word.length;

        const checkedLetter: Letter = {
            letter,
            isTyped,
            isCorrect,
            isExtraLetter,
        };

        return checkedLetter;
    });

    const incorrectlyTypedWord = isTyped && !isWordCorrect && !active;

    const checkedWord: Word = {
        originalWord: word,
        word: finalWordStr,
        letters: finalWord,
        incorrectlyTypedWord,
        isComplete,
        index,
    };

    return checkedWord;
}
