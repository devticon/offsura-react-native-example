
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-relay',
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],
};
