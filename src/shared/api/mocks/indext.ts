import { isBrowser, isNative } from '@utils/platform';

// Функция для инициализации MSW
export async function initializeMSW() {
	// Проверяем, находимся ли мы в режиме разработки
	if (process.env.NODE_ENV !== 'development') {
		return;
	}

	if (isNative) {
		console.log('isNative');

		await import('./msw.polyfills');
		const { server } = await import('./server.native');
		console.log('server', server);

		server.listen({ onUnhandledRequest: 'bypass' });
		console.log('🔶 MSW Server started (Native)');
	}

	if (isBrowser) {
		// Для браузера
		const { worker } = await import('./server.web');
		console.log('🔶 MSW Server started (Browser)');
		worker.start();
	}
}

// Экспортируем флаг, указывающий, включен ли MSW
export const isMSWEnabled = process.env.NODE_ENV === 'development';
