/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      main: string;
      secondary: string;
    };
  }
}
import {darkTheme, lightTheme} from './src/styles/lightTheme';
