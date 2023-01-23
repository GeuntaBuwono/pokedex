import 'jest-styled-components/native';

import {fireEvent, render, screen} from '@testing-library/react-native';
import CardItem from 'components/Card';
import {PokemonResults} from 'schema/PokemonSchema';
import TestingWrapper from 'utils/TestingWrapper';

import {mockedNavigate} from '../../../jest/jest.setupFiles';

const ITEM_DATA: PokemonResults = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

describe('Badge', () => {
  render(
    <TestingWrapper>
      <CardItem index={1} item={ITEM_DATA} onPress={() => undefined} />
    </TestingWrapper>,
  );
  test('renders correctly', () => {
    expect(screen.getByText('bulbasaur')).toBeTruthy();
    fireEvent.press(screen.getByText('bulbasaur'));
    expect(mockedNavigate).toHaveBeenCalledTimes(0);
  });
});
