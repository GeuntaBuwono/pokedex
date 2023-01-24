import {
  DarkTheme as NavigationDefaultDarkTheme,
  Theme,
} from '@react-navigation/native';
import {DefaultTheme} from 'styled-components/native';

export const darkTheme: DefaultTheme = {
  card: {
    background: {
      color: '#616161',
    },
    image: {
      background: {
        color: '#E0E0E0',
      },
    },
  },
  list: {
    background: {
      color: '#212121',
    },
  },
  screen: {
    background: {
      color: '#212121',
    },
    pokemonType: {
      color: '#212121',
    },
  },
  text: {
    title: {
      color: '#fff',
    },
    description: {
      color: '#fff',
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

export const NavigationDarkTheme: Theme = {
  ...NavigationDefaultDarkTheme,
  colors: {
    ...NavigationDefaultDarkTheme.colors,
    card: '#37474F',
  },
};
