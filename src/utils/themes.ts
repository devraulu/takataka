import { Tuple } from '@mantine/core';
import { SingleShadeSwatch } from '../models/Theme';

export function getShades(hex: string): Tuple<string, 10> {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb?.r, rgb?.g, rgb?.b);

  const shades = Array(10)
    .fill(null)
    .map((_, i) => {
      const lightness = hsl.l + (5 - i) * 0.1; // modified this line
      return hslToHex({ ...hsl, l: clamp(lightness, 0, 1) });
    });

  return convertArrayToTuple(shades);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(r = 255, g = 255, b = 255): { h: number; s: number; l: number } {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

function hslToHex(hsl: { h: number; s: number; l: number }): string {
  let r, g, b;
  const { h, s, l } = hsl;

  if (s == 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num;
}

function convertArrayToTuple(
  array: string[]
): [string, string, string, string, string, string, string, string, string, string] {
  if (array.length !== 10) {
    throw new Error('Array must have exactly 10 elements');
  }

  const [a, b, c, d, e, f, g, h, i, j] = array;
  return [a, b, c, d, e, f, g, h, i, j];
}

export const themesArr: string[][] = [
  // ['#FF220C', '#D33E43', '#9B7874', '#666370', 'sunset embers'],
  // ['#DB3069', '#32213A', '#66717E', '#DDCECD', 'cosmic fog'],
  // ['#F1F2EB', '#D8DAD3', '#A4C2A5', '#566246', 'retro verdigris'],
  ['#6495ED', '#FFFAFA', '#4682B4', '#2C2C2C', 'crystal skies'],

  ['#B3446C', '#F3E9E5', '#28262C', '#FFFFFF', 'rose gold noir'],
  ['#FFD700', '#FFF8DC', '#BDB76B', '#3F3F3F', 'golden era'],
  ['#FF7F00', '#FDBE85', '#C06C84', '#282828', 'sunrise synth'],

  ['#708238', '#F5DEB3', '#372A25', '#EFEFEF', 'retro field'],
  ['#FFDEAD', '#CD853F', '#8B4513', '#3C3C3C', 'desert dusk'],
  ['#E9967A', '#FFA07A', '#FF7F50', '#363636', 'coral cascade'],
  ['#423E3F', '#D7B9A4', '#73605B', '#F1F1F1', 'dusk noir'],
  ['#9DC3C2', '#3A6186', '#0E273C', '#FFFFFF', 'ocean drive'],
  ['#87CEFA', '#708090', '#191970', '#F5F5F5', 'blue moon'],
];

const themes = themesArr.map<SingleShadeSwatch>((elem) => ({
  primary: elem[0],
  secondary: elem[1],
  tertiary: elem[2],
  background: elem[3],
  name: elem[4],
}));

export function logColor(color: string): void {
  console.log(`%c ${color}`, `color: ${color}`);
}

export default themes;
