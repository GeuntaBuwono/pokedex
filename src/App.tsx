/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {AppStackNavigator} from 'screens/AppStackNavigator';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AppStackNavigator />
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
