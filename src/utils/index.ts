export const isLetter = (char: string) => {
  return char.length === 1 && !!char.match(/[a-zA-Z]/i);
};

export const isSpace = (char: string) => {
  return char?.length === 1 && !!char.match(/\s/);
};

export const isPunctuation = (char: string) => {
  return char.length === 1 && !!char.match(/[.,\/#!$%\^&\*;:{}=\-_`~()?¡¿]/);
};

export const isNumber = (char: string) => {
  return char.length === 1 && !!char.match(/[0-9]/);
};

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isMobile() {
  // Logic to check if the device is a mobile device
  // You can use user-agent detection or any other method
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
