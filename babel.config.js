module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      compact: false,
    },
  },
  plugins: [
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          'components/*': ['components/*'],
          'constants/*': ['constants/*'],
          'hooks/*': ['hooks/*'],
          'images/*': ['images/*'],
          'layout/*': ['layout/*'],
          'locales/*': ['locales/*'],
          'navigators/*': ['navigators/*'],
          'screen/*': ['screen/*'],
          'utils/*': ['utils/*'],
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
