/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      white: string;
      netural: {
        500: string;
        400: string;
        300: string;
      };
      secondary: {
        yellow: string;
        red: {
          600: string;
        };
      };
      blue: {
        700: string;
      };
      green: {
        700: string;
      };
    };
  }
}
import {darkTheme, lightTheme} from './src/styles/lightTheme';
