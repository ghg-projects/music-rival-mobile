module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      'nativewind/babel',
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./'],
          alias: {
            '@/components': './components',
            '@/constants': './constants',
            '@/shared': './shared',
            '@/assets': './assests',
            '@/app': './app',
          },
        },
      ],
    ],
  };
};
