module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        //'airbnb'
    ],
    plugins: ['prettier'],
    rules: {
        'semi': 1,
        'react/jsx-max-props-per-line': 1,
        'react/prop-types': 2,
        'no-unused-vars': 1,
        'prettier/prettier': ['error'],
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
};
