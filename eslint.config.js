module.exports = {
    files: ['./src/**/*.{ts,vue}'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
    },
    plugins: ['vue', '@typescript-eslint', 'prettier', 'import'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
            'vue-eslint-parser': ['vue'],
        },
        'import/resolver': {
            project: 'tsconfig.json',
        },
    },
    rules: {},
};
