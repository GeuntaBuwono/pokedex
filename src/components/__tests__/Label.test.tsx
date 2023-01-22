import 'jest-styled-components';

import {render, screen} from '@testing-library/react-native';
import Label from 'components/Label';
import TestingWrapper from 'utils/TestingWrapper';

describe('Label', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <Label>Testing</Label>
      </TestingWrapper>,
    );
    expect(screen.getByText('Testing')).toBeTruthy();
  });
});
