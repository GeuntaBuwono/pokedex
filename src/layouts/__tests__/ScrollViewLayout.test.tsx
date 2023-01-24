import 'jest-styled-components/native';

import {render, screen} from '@testing-library/react-native';
import Label from 'components/Label';
import ScrollViewLayout from 'layouts/ScrollViewLayout';
import TestingWrapper from 'utils/TestingWrapper';

describe('Scroll View Layout', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <ScrollViewLayout isNoPadding>
          <Label>ScrollViewLayout</Label>
        </ScrollViewLayout>
      </TestingWrapper>,
    );
    expect(screen.getByText('ScrollViewLayout')).toBeTruthy();
  });
});
