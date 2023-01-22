import {render, screen} from '@testing-library/react-native';
import LoadingSpinner from 'components/Loading';
import TestingWrapper from 'utils/TestingWrapper';

describe('Loading', () => {
  test('renders correctly', () => {
    render(
      <TestingWrapper>
        <LoadingSpinner />
      </TestingWrapper>,
    );
    expect(screen).toBeTruthy();
  });
});
