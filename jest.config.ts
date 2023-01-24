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
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
};

export default config;
