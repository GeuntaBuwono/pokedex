import 'jest-styled-components/native';

import {render, screen} from '@testing-library/react-native';
import ListFooter from 'components/ListFooter';
import TestingWrapper from 'utils/TestingWrapper';

describe('Badge', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <ListFooter onPress={() => undefined} />
      </TestingWrapper>,
    );
    expect(screen.getByText('Load More ...')).toBeTruthy();
  });
});
