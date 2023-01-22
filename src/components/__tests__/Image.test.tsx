import {render, screen} from '@testing-library/react-native';
import StyledImage from 'components/Image';
import TestingWrapper from 'utils/TestingWrapper';

describe('Image', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <StyledImage
          testID="testingImg"
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          }}
        />
      </TestingWrapper>,
    );
    expect(screen.getByTestId('testingImg')).toBeTruthy();
  });
});
