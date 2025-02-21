export interface LetterStat {
    letter: string;
    isTyped: boolean;
    isCorrect: boolean;
    isExtraLetter: boolean;
}

export interface WordStat {
    index: number;
    originalWord: string;
    word: string;
    letters: LetterStat[];
    incorrectlyTypedWord: boolean;
    isComplete: boolean;
}
