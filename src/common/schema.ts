import { z } from 'zod';

export const dateRangeSchema = z.object({
	from: z.string().datetime().default(''),
	to: z.string().datetime().default(''),
});
export type DateRange = z.infer<typeof dateRangeSchema>;

export const locationSchema = z.object({
	city: z.string(),
	country: z.string().optional(),
	lat: z.number(),
	lng: z.number(),
});
export type Location = z.infer<typeof locationSchema>;

export const routeSchema = z
	.object({
		from: locationSchema,
		to: locationSchema,
	})
	.refine((data) => data.from.city !== data.to.city, {
		message: 'Пункты отправления и назначения не должны совпадать',
		path: ['to.location'],
	});

export type RouteSchema = z.infer<typeof routeSchema>;

export const mediaAssetSchema = z.object({
	uri: z.string(),
	fileName: z.string().nullable().optional(),
	assetId: z.string().nullable().optional(),
	type: z.enum(['image', 'video', 'livePhoto', 'pairedVideo']).optional(),
	width: z.number(),
	height: z.number(),
	fileSize: z.number().optional(),
	mimeType: z.string().optional(),
	duration: z.number().optional(),
});

export type MediaAsset = z.infer<typeof mediaAssetSchema>;
