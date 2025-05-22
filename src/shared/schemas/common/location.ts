import { z } from 'zod';

export const locationSchema = z.object({
	city: z.string(),
	country: z.string().optional(),
	lat: z.number().optional(),
	lng: z.number().optional(),
});
export type LocationSchema = z.infer<typeof locationSchema>;

// Базовая схема маршрута без строгой валидации
export const routeBaseSchema = z.object({
	from: locationSchema,
	destination: locationSchema,
});

// Полная схема маршрута для создания заявок с валидацией обоих направлений
export const routeCreationSchema = z.object({
	from: locationSchema.refine(
		(location) => location.city && location.city.length > 0,
		{
			message: 'Укажите откуда',
		},
	),
	to: locationSchema.refine(
		(location) => location.city && location.city.length > 0,
		{
			message: 'Укажите куда',
		},
	),
});

// Для обратной совместимости используем полную схему в качестве основной
export const routeSchema = routeCreationSchema;

export type RouteSchema = z.infer<typeof routeSchema>;
export type RouteBaseSchema = z.infer<typeof routeBaseSchema>;
export type RouteCreationSchema = z.infer<typeof routeCreationSchema>;
