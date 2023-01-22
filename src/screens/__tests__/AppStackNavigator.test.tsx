import 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {AppStackNavigator} from 'screens/AppStackNavigator';

import i18n from '../../i18n/i18n';

// Note: test renderer must be required after react-native.
describe('App Stack Navigator', () => {
  test('renders correctly', () => {
    const component = (
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </I18nextProvider>
    );

    render(component);
    expect(screen.getByText('Homepage')).toBeTruthy();
  });
});
