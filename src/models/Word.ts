export interface Letter {
    letter: string;
    isTyped: boolean;
    isCorrect: boolean;
    isExtraLetter: boolean;
    isLastLetterBeingTyped: boolean;
}

export interface Word {
    word: string;
    letters: Letter[];
    incorrectlyTypedWord: boolean;
    isLastWordBeingTyped: boolean;
    isComplete: boolean;
}
