import { generate } from 'random-words';

const capitalizeFirstLetter = (word: string) =>
    word[0].toUpperCase() + word.slice(1);

export function generateTestWords(
    size: number,
    punctuation?: boolean,
    numbers?: boolean,
): string {
    const generatedWordsSet = new Set<string>();
    console.log('size', size, 'punctuation', punctuation, 'numbers', numbers);

    while (generatedWordsSet.size < size) {
        const missingWordsSize = size - generatedWordsSet.size;
        const generatedWords = generate({
            exactly: missingWordsSize,
        }) as string[];

        generatedWords.forEach(word => {
            generatedWordsSet.add(word);
        });
    }

    let words = Array.from(generatedWordsSet);

    // since our test size is always more than 1 word long and generate returns string or string[]
    // we convert it to string[] to be able to use map

    // Optionally include numbers
    if (numbers)
        words = words.map((word, i) => {
            // Randomly add numbers
            const rand = Math.random();
            if (rand < 0.1) {
                if (words[i + 1])
                    words[i + 1] = Math.floor(Math.random() * 10) + '';
            }
            return word;
        });

    // Define possible punctuation marks
    const punctuationMarks = '.,:;?!'.split('');

    // Optionally include punctuation
    if (punctuation) {
        words[0] = capitalizeFirstLetter(words[0]);
        words = words.map((word, i) => {
            // Randomly add punctuation
            if (Math.random() < 0.1) {
                const punctuationMark =
                    punctuationMarks[
                        Math.floor(Math.random() * punctuationMarks.length)
                    ];

                word += punctuationMark;
                if (['.', '!', '?'].includes(punctuationMark)) {
                    if (words[i + 1]) {
                        words[i + 1] = capitalizeFirstLetter(words[i + 1]);
                    }
                }
            }

            return word;
        });
        const lastWord = words[words.length - 1];
        const lastCharacter = lastWord[lastWord.length - 1];
        if (!'?!'.includes(lastCharacter)) {
            words[words.length - 1] = words[words.length - 1] + '.';
        }
    }

    return words.join(' ');
}
