import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
	{
		ignores: [
			'node_modules',
			'dist',
			'.yarn',
			'.expo',
			'./**/*.config.*',
			'scripts',
		],
		settings: {
			'import/resolver': {
				alias: {
					map: [
						['@components', './src/shared/components'],
						['@icons', './src/shared/components/icons'],
						['@modules', './src/modules'],
						['@layout', './src/layout'],
						['@hooks', './src/hooks'],
						['@context', './src/context'],
						['@shared', './src/shared'],
						['@utils', './src/shared/utils'],
						['@lib', './src/shared/lib'],
						['@widgets', './src/widgets'],
						['@modals', './src/modals'],
						['@localization', './src/localization'],
						['@', './src'],
					],
					extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
				},
			},
		},
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
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
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
			'react/self-closing-comp': [
				'error',
				{
					component: true,
					html: true,
				},
			],
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'off',
			'react-native/no-inline-styles': 'off',
			'react-native/no-raw-text': 'off',
			'react-native/no-unused-styles': 'warn',
			'react/no-unescaped-entities': 'off',
			'react/display-name': 'off',
			'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
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
