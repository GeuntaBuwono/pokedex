/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {isDarkThemeAtom} from 'atoms/appAtom';
import {useAtom} from 'jotai';
import React from 'react';
import {AppStackNavigator} from 'screens/AppStackNavigator';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme} from 'styles/darkTheme';
import {lightTheme} from 'styles/lightTheme';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const [isDarkTheme] = useAtom(isDarkThemeAtom);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <AppStackNavigator />
        </QueryClientProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
