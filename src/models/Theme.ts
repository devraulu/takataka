import { Tuple } from '@mantine/core';

type ThemeSwatch = {
  primary: Tuple<string, 10>;
  secondary: Tuple<string, 10>;
  tertiary: Tuple<string, 10>;
  background: Tuple<string, 10>;
};

export type SingleShadeSwatch = {
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
};

export default ThemeSwatch;
