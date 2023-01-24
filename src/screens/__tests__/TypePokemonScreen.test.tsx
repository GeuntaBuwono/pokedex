import 'react-native';

import {render, screen} from '@testing-library/react-native';
import React from 'react';
import TypePokemonScreen from 'screens/TypePokemonScreen';
import TestingWrapper from 'utils/TestingWrapper';

describe('Type Pokemon Screen', () => {
  test('renders correctly', async () => {
    render(
      <TestingWrapper>
        <TypePokemonScreen />
      </TestingWrapper>,
    );
    expect(screen.getByText('Pokemon with Type')).toBeTruthy();
    expect(screen.getByText('normal')).toBeTruthy();
  });
});
