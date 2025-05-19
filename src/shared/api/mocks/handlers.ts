import { CONFIG } from '@shared/config';
import { filterCities } from '@widgets/LocationSelector/helpers';
import { HttpResponse } from 'msw';
import { createOpenApiHttp } from 'openapi-msw';
import type { ApiPaths } from '../schema';
import { locations } from '../seed/dbSeed';

const http = createOpenApiHttp<ApiPaths>({
	baseUrl: CONFIG.API_BASE_URL,
});

export const handlers = [
	http.get('/locations', ({ query, params }) => {
		const city = query.get('city');

		const filtered = filterCities(city, locations);
		return HttpResponse.json(filtered, { status: 200 });
	}),
];
