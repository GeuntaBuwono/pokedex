import 'react-native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import TypePokemonScreen from 'screens/TypePokemonScreen';
import TestingWrapper from 'utils/TestingWrapper';

import {mockedNavigate} from '../../../jest/jest.setupFiles';

describe('Type Pokemon Screen', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <TypePokemonScreen />
      </TestingWrapper>,
    );
    expect(screen.getByText('Type Pokemon')).toBeTruthy();

    fireEvent.press(screen.getByText('Go To Detail Pikachu'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});
