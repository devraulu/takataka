import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isLetter = (char: string) => {
    return char.length === 1 && !!char.match(/[a-zA-Z]/i);
};

export const isSpace = (char: string) => {
    return char?.length === 1 && !!char.match(/\s/);
};

export const isPunctuation = (char: string) => {
    return char.length === 1 && !!char.match(/[.,/#!$%^&*;:{}=\-_`~()?¡¿]/);
};

export const isNumber = (char: string) => {
    return char.length === 1 && !!char.match(/[0-9]/);
};

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
        return true;
    }

    if (
        typeof obj1 !== 'object' ||
        obj1 === null ||
        typeof obj2 !== 'object' ||
        obj2 === null
    ) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

export function isMobile() {
    // Logic to check if the device is a mobile device
    // You can use user-agent detection or any other method
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
    );
}
