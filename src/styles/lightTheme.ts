import {
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from '@react-navigation/native';
import {DefaultTheme} from 'styled-components/native';

export const lightTheme: DefaultTheme = {
  card: {
    background: {
      color: '#fff',
    },
    image: {
      background: {
        color: '#E0E0E0',
      },
    },
  },
  list: {
    background: {
      color: '#FFCB3B',
    },
  },
  screen: {
    background: {
      color: '#fff',
    },
    pokemonType: {
      color: '#f3f3f3',
    },
  },
  text: {
    title: {
      color: '#42494D',
    },
    description: {
      color: '#42494D',
    },
  },
  colors: {
    white: '#fff',
    netural: {
      500: '#42494D',
      400: '#7B8082',
      300: '#B3B6B8',
    },
    secondary: {
      yellow: '#E6AB09',
      red: {
        600: '#DE2C2C',
      },
    },
    blue: {
      700: '#056593',
    },
    green: {
      700: '#01A54D',
    },
  },
};

export const NavigationLightTheme: Theme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    card: '#fff',
  },
};
