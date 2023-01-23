import 'react-native';

import {render, screen} from '@testing-library/react-native';
import React from 'react';
import HomepageScreen from 'screens/HomepageScreen';
import TestingWrapper from 'utils/TestingWrapper';

describe('Homepage Screen', () => {
  const wrapper = (
    <TestingWrapper>
      <HomepageScreen />
    </TestingWrapper>
  );

  test('renders correctly', () => {
    render(wrapper);
    expect(
      screen.getByText('Thousands of data compiled into one place'),
    ).toBeTruthy();
  });
});
