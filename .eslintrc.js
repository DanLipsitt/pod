module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: ['error', 4],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['warn', 2],
    'comma-dangle': ['warn', 'always-multiline'],
    'no-console': ['warn'],
    'react/jsx-no-bind': ['warn'],
    'react/prop-types': ['warn'],
  },
};
