module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off']
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: [
    //       '**/*.test.ts',
    //       '**/*.test.tsx',
    //       '**/testDoubles/**/*',
    //     ],
    //   },
    // ],
  },
};
