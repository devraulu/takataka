import { generate } from 'random-words';

const sentenceCase = (word: string) => word[0].toUpperCase() + word.slice(1);

export function generateTest(size: number, punctuation?: boolean, numbers?: boolean) {
  let words = generate(size);

  // Optionally include numbers
  if (numbers)
    words = words.map((word, i) => {
      // Randomly add numbers
      const rand = Math.random();
      if (rand < 0.1) {
        if (words[i + 1]) words[i + 1] = Math.floor(Math.random() * 10) + '';
      }
      return word;
    });

  // Define possible punctuation marks
  const punctuationMarks = ['.', ',', ':', ';', '?', '!'];

  // Optionally include punctuation
  if (punctuation) {
    words[0] = sentenceCase(words[0]);
    words = words.map((word, i) => {
      // Randomly add punctuation
      if (Math.random() < 0.1) {
        const punctuationMark =
          punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];

        word += punctuationMark;
        if (['.', '!', '?'].includes(punctuationMark)) {
          if (words[i + 1]) {
            words[i + 1] = sentenceCase(words[i + 1]);
          }
        }
      }

      return word;
    });
    words[words.length - 1] = words[words.length - 1] + '.';
  }

  return words.join(' ');
}
