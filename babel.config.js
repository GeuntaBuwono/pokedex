module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
          'layout/*': ['layout/*'],
          'screen/*': ['screen/*'],
          'utils/*': ['utils/*'],
        },
      },
    ],
  ],
};
