import { AdStatus, AdType } from '@shared/api/models/ad';
import { routeCreationSchema } from '@shared/schemas/common/location';
import { mediaAssetSchema } from '@shared/schemas/common/media';
import { parcelInfoSchema } from '@shared/schemas/common/parcel';
import { z } from 'zod';

export const responseSchema = z.object({
	id: z.string(),
	userId: z.string(),
	createdAt: z.date().or(z.string()).optional(),
	status: z.enum(['pending', 'accepted', 'rejected']).default('pending'),
	message: z.string().optional(),
});

export const metricsSchema = z.object({
	likes: z.number().default(0),
	views: z.number().default(0),
	comments: z.number().default(0),
});

export const adSchema = z.object({
	id: z.string(),
	userId: z.string(),
	name: z
		.string()
		.min(1, { message: 'Введите название объявления' })
		.max(50, { message: 'Длина названия не может превышать 50 символов' }),
	media: z.array(mediaAssetSchema).default([]),
	route: routeCreationSchema,
	rewards: z.string(),
	description: z.string().min(1, { message: 'Введите описание объявления' }),
	parcelInfo: parcelInfoSchema,
	responses: z.array(responseSchema).default([]),
	metrics: metricsSchema,
	type: z.nativeEnum(AdType),
	status: z.nativeEnum(AdStatus).default(AdStatus.Draft),
});

export type AdModel = z.infer<typeof adSchema>;
export type AdResponse = z.infer<typeof responseSchema>;
export type AdMetricsModel = z.infer<typeof metricsSchema>;
