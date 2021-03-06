module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 0,
    'no-shadow': ['error', { allow: ['state'] }],
    'linebreak-style': 'off',
    'max-len' : ['error', {code : 300}],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
