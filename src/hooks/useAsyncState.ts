import { useState } from 'react';

type UseAsyncStateCallback<T> = (...args: unknown[]) => Promise<T> | T;

export interface UseAsyncStateReturn<T, Params extends unknown[]> {
	data: T | null;
	isLoading: boolean;
	isReady: boolean;
	error: unknown;
	refetch: (...args: Params) => Promise<void> | void;
}

export interface UseAsyncStateOptions<T> {
	immediate?: boolean;
	throwOnError?: boolean;
	onError?: (err: unknown) => void;
	onLoad?: (data: T) => void;
}

export const useAsyncState = <T>(
	fn: UseAsyncStateCallback<T>,
	options: UseAsyncStateOptions<T> = {},
): UseAsyncStateReturn<T, Parameters<typeof fn>> => {
	const { immediate = true, throwOnError = false, onError, onLoad } = options;
	const [isLoading, setLoading] = useState(false);
	const [isReady, setReady] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<unknown>(null);

	const loading = (load: boolean) => {
		setLoading(load);
		setReady(!load);
	};

	const refetch = async (...args: Parameters<typeof fn>) => {
		loading(true);

		try {
			const result = await fn(...args);

			setData(() => result);
			onLoad?.(result);
		} catch (err) {
			if (throwOnError) {
				throw err;
			}
			setError(() => err);
			onError?.(err);
		} finally {
			loading(false);
		}
	};

	if (immediate) {
		refetch();
	}

	return {
		data,
		isLoading,
		error,
		isReady,
		refetch,
	};
};
