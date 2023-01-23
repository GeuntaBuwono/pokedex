import 'jest-styled-components/native';

import {render, screen} from '@testing-library/react-native';
import Button from 'components/Button';
import TestingWrapper from 'utils/TestingWrapper';

describe('Badge', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <Button onPress={() => undefined} $bgColor="red">
          Button Testing
        </Button>
      </TestingWrapper>,
    );
    expect(screen.getByText('Button Testing')).toBeTruthy();
  });
});
