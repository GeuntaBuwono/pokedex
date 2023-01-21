/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

export const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {
      id: '123',
    },
  }),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
    push: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));
