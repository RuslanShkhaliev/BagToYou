import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';

export default tseslint.config([
	{
		ignores: [
			'node_modules',
			'dist',
			'.yarn',
			'.expo',
			'eslint.config.mjs',
			'prettier.config.mjs',
			'tamagui.config.ts',
			'scripts',
		],
	},

	js.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		files: ['./src/**/*.{ts,tsx}'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-misused-promises': 'warn',
			'@typescript-eslint/no-empty-object-type': 'off',
		},
	},
	{
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
			},
		},
	},
	pluginReact.configs.flat.recommended,

	{
		files: ['./src/**/*.{js,jsx,ts,tsx}'],
		plugins: {
			'react-hooks': reactHooks,
			'react-native': reactNative,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'off',
			'react-native/no-inline-styles': 'off',
			'react-native/no-raw-text': 'off',
			'react-native/no-unused-styles': 'warn',
			'react/no-unescaped-entities': 'off',
			'react/display-name': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
	},

	prettier,
]);
