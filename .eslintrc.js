module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "no-unused-expressions": "off",
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
      },
    ],
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1,
    'valid-jsdoc': 1,
    'require-jsdoc': 1,
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'ignore' } }],
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'always-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
};
