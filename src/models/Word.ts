export interface Letter {
    letter: string;
    isTyped: boolean;
    isCorrect: boolean;
    isExtraLetter: boolean;
}

export interface Word {
    index: number;
    originalWord: string;
    word: string;
    letters: Letter[];
    incorrectlyTypedWord: boolean;
    isComplete: boolean;
}
