import { z } from 'zod';

export const locationSchema = z.object({
	city: z.string(),
	country: z.string().optional(),
	lat: z.number().optional(),
	lng: z.number().optional(),
});
export type LocationSchema = z.infer<typeof locationSchema>;

export const routeSchema = z
	.object({
		from: locationSchema,
		to: locationSchema,
	})
	.refine(({ to, from }) => to.city !== from.city, {
		message: 'Пункты отправления и назначения не должны совпадать',
		path: ['to.location'],
	});

export type RouteSchema = z.infer<typeof routeSchema>;
