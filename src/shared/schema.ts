import { z } from 'zod';

export const dateRangeSchema = z.object({
	from: z.string().datetime(),
	to: z.string().datetime(),
});
export type DateRange = z.infer<typeof dateRangeSchema>;

export const locationSchema = z.object({
	city: z.string(),
	country: z.string().optional(),
	lat: z.number().optional(),
	lng: z.number().optional(),
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
	type: z.string().optional(),
	width: z.number(),
	height: z.number(),
	fileSize: z.number().optional(),
	mimeType: z.string().optional(),
	duration: z.number().nullable().optional(),
});

export type MediaAsset = z.infer<typeof mediaAssetSchema>;

const toNumber = (val: unknown) => {
	if (typeof val === 'string' && val.trim().length) {
		return Number(val);
	}
	return val;
};

export const parcelInfoSchema = z.object({
	weight: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите вес посылки' })
			.min(0.01, { message: 'Вес должен быть больше 0' }),
	),
	length: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите длину посылки' })
			.min(0.01, { message: 'Длина должна быть больше 0' }),
	),
	width: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите ширину посылки' })
			.min(0.01, { message: 'Ширина должна быть больше 0' }),
	),
	height: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите высоту посылки' })
			.min(0.01, { message: 'Высота должна быть больше 0' }),
	),
});
export type ParcelInfo = z.infer<typeof parcelInfoSchema>;
