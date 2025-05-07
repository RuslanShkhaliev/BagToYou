import { CONFIG } from '@shared/config';
import { QueryClient } from '@tanstack/react-query';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { ApiPaths } from './schema';
export const queryClient = new QueryClient();

export const fetchClient = createFetchClient<ApiPaths>({
	baseUrl: CONFIG.API_BASE_URL,
});

export const $apiClient = createClient(fetchClient);
