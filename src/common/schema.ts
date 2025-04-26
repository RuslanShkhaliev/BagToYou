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
