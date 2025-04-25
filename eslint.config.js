import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default [
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'cypress/**',
            'tests/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/*.spec.{js,jsx,ts,tsx}'
        ]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            ...jsxA11yPlugin.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            'no-unused-vars': 'off',
            'prefer-const': 'error',
            '@typescript-eslint/no-unused-vars': ['error'],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'arrow-body-style': ['error', 'always'],
            'react/no-danger': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/button-has-type': 'error',
            'react/require-default-props': 'error',
            'react/no-array-index-key': 'error',
            'react/display-name': 'error',
            'react/no-danger-with-children': 'error',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    eslintConfigPrettier,
]
