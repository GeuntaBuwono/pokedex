import 'react-native';

import {render, screen} from '@testing-library/react-native';
import React from 'react';
import DetailPokemonScreen from 'screens/DetailPokemonScreen';

// Note: test renderer must be required after react-native.
describe('Detail Pokemon Screen', () => {
  test('renders correctly', () => {
    render(<DetailPokemonScreen />);
    expect(screen.getByText('Detail Pokemon')).toBeTruthy();
  });
});
