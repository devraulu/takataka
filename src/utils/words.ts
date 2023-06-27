import { Letter, Word } from '../models/Word';

export function fitsInCurrentLine(
  word: Word,
  line: Word[],
  fontWidth: number,
  containerWidth: number
) {
  // We calculate the width of the word using the width of the current font at it's current size
  // and multiply it by the length of the word plus one space

  const wordWidth = (word.word.length + 1) * fontWidth;

  // To know the width of the line we calculate the width of each word,
  //  then add each width
  const lineWidth = line
    .map((elem) => (elem.word.length + 1) * fontWidth)
    .reduce((acc, item) => acc + item, 0);

  return lineWidth + wordWidth < containerWidth;
}

export function findActiveLineIndex(lines: Word[][], currentTypingIndex: number) {
  const index = lines.findIndex((elem, i, arr) => {
    const previousLinesSize = arr.slice(0, i).reduce((acc, elem) => (acc += elem.length), 0);

    const isCurrentLine =
      currentTypingIndex > previousLinesSize &&
      currentTypingIndex <= previousLinesSize + elem.length;

    return isCurrentLine;
  });

  return index;
}

export function checkWords(words: string[], typed: string[]) {
  const checkedWords = words.map((word, i) => {
    const typedNotEmpty = typed.length > 0;
    const isTyped = typedNotEmpty && !!typed[i];
    const isComplete = isTyped && typed[i].length === word.length;
    const isLastWordBeingTyped = typed.length - 1 === i;

    const isWordCorrect = typed[i] === word;
    const isExtra = typedNotEmpty && !!typed[i] && typed[i].length > word.length;
    const finalWordStr = `${word}${typed[i]?.slice(word.length) ?? ''}`;

    const finalWord = finalWordStr.split('').map((letter, j) => {
      const isTyped = typedNotEmpty && !!typed[i] && !!typed[i][j];
      const isCorrect = isTyped && letter === typed[i][j];
      const isExtraLetter = isExtra && j >= word.length;
      const isLastLetterBeingTyped = isLastWordBeingTyped && j === typed[i]?.length;

      const checkedLetter: Letter = {
        letter,
        isTyped,
        isCorrect,
        isExtraLetter,
        isLastLetterBeingTyped,
      };

      return checkedLetter;
    });

    const incorrectlyTypedWord = isTyped && !isWordCorrect && !isLastWordBeingTyped;
    const checkedWord: Word = {
      originalWord: word,
      word: finalWordStr,
      letters: finalWord,
      incorrectlyTypedWord,
      isLastWordBeingTyped,
      isComplete,
    };

    return checkedWord;
  });

  return checkedWords;
}
