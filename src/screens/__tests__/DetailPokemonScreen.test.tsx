import 'react-native';

import {render, screen, waitFor} from '@testing-library/react-native';
import React from 'react';
import DetailPokemonScreen from 'screens/DetailPokemonScreen';
import TestingWrapper from 'utils/TestingWrapper';
// Note: test renderer must be required after react-native.
describe('Detail Pokemon Screen', () => {
  test('renders correctly', async () => {
    render(
      <TestingWrapper>
        <DetailPokemonScreen />
      </TestingWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('Stats :')).toBeTruthy();
    });
  });
});
