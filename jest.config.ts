import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest/jest.setupFiles.js'],
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest.setupFilesAfterEnv.js',
    '@testing-library/jest-native/extend-expect',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    'src/screens/TypePokemonScreen.tsx',
    'src/screens/DetailPokemonScreen.tsx',
    'src/screens/HomepageScreen.tsx',
  ],
  testPathIgnorePatterns: [
    'src/__tests__/App.test.tsx',
    'src/screens/__tests__/DetailPokemonScreen.test.tsx',
    'src/navigators/__tests__/AppStackNavigator.test.tsx',
    'src/screens/__tests__/HomepageScreen.test.tsx',
    'src/navigators/__tests__/AppDrawerNavigator.test.tsx',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation|react-native-animated)',
  ],
};

export default config;
