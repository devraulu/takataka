export const isLetter = (char: string) => {
	return char.length === 1 && !!char.match(/[a-zA-Z]/i);
};

export const isSpace = (char: string) => {
	return char?.length === 1 && !!char.match(/\s/);
};

export const isPunctuation = (char: string) => {
	return char.length === 1 && !!char.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/);
};

