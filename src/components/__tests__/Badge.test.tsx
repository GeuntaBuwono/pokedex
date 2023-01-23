import 'jest-styled-components/native';

import {render, screen} from '@testing-library/react-native';
import Badge from 'components/Badge';
import TestingWrapper from 'utils/TestingWrapper';

describe('Badge', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <Badge $bgColor="blue" label="Badge Testing" $size="lg" />
      </TestingWrapper>,
    );
    expect(screen.getByText('Badge Testing')).toBeTruthy();
    expect(screen.getByText('Badge Testing')).toHaveStyleRule(
      'backgroundColor',
      undefined,
    );
  });
});
