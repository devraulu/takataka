import { generate } from 'random-words';

const capitalizeFirstLetter = (word: string) =>
    word[0].toUpperCase() + word.slice(1);

export function generateTestWords(
    size: number,
    punctuation?: boolean,
    numbers?: boolean,
): string {
    const generatedWords = generate(size);

    // since our test size is always more than 1 word long and generate returns string or string[]
    // we convert it to string[] to be able to use map
    let words =
        typeof generatedWords === 'string' ? [generatedWords] : generatedWords;

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
    const punctuationMarks = ['.', ',', ':', ';', '?', '!'];

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
        words[words.length - 1] = words[words.length - 1] + '.';
    }

    return words.join(' ');
}
