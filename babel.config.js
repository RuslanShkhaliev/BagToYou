module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
					alias: {
						'@components': './src/shared/components',
						'@icons': './src/shared/components/icons',
						'@shared': './src/shared',
						'@utils': './src/shared/utils',

						'@modules': './src/modules',
						'@layout': './src/layout',
						'@hooks': './src/hooks',
						'@context': './src/context',
						'@widgets': './src/widgets',
						'@lib': './src/lib',
						'@localization': './src/localization',
						'@modals': './src/modals',
						'@': './src',
					},
				},
			],
			[
				'@tamagui/babel-plugin',
				{
					components: ['tamagui'],
					config: './tamagui.config.ts',
					logTimings: true,
					disableExtraction: process.env.NODE_ENV === 'development',
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
