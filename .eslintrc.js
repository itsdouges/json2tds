module.exports = {
  extends: 'eslint-config-mi9/flow',

  parser: 'babel-eslint',

  plugins: [
    'flowtype',
    'mocha',
  ],

  parserOptions: {
    ecmaFeatures: {
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },
};
