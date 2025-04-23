import { z } from 'zod';

export const locationSchema = z.object({
	city: z.string().default(''),
	country: z.string().optional().default(''),
	lat: z.number().optional(),
	lng: z.number().optional(),
});
export type Location = z.infer<typeof locationSchema>;

export const dateRangeSchema = z.object({
	from: z.string().datetime().default(''),
	to: z.string().datetime().default(''),
});
export type DateRange = z.infer<typeof dateRangeSchema>;

export const routePointSchema = z.object({
	location: locationSchema.default({}),
	date: dateRangeSchema.default({}),
});
export type RoutePoint = z.infer<typeof routePointSchema>;
