module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-trailing-spaces': 'warn',
    'comma-dangle': 'warn',
    indent: ['warn', 2],
    'no-unused-vars': 'warn'
  }
}
