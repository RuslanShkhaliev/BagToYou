import { TransportType } from '@/common';
import { mediaAssetSchema, routeSchema } from '@/common/schema';
import { z } from 'zod';

export const formStep1Scheme = z.object({
	route: routeSchema,
	date: z.date(),
	transport: z.nativeEnum(TransportType).default(TransportType.Plane),
});

export const formStep2Scheme = z.object({
	name: z.string().min(1, 'Имя обязательно'),
	surname: z.string().min(1, 'Фамилия обязательна'),
	phone: z.string().min(1, 'Телефон обязателен'),
	width: z.string().min(1, 'Ширина обязательна'),
	height: z.string().min(1, 'Высота обязательна'),
	length: z.string().min(1, 'Длина обязательна'),
	weight: z.string().min(1, 'Вес обязателен'),
	description: z.string().optional(),
	rewards: z.string().optional(),
	media: z.array(mediaAssetSchema),
});

export type FormStep1Scheme = z.infer<typeof formStep1Scheme>;
export type FormStep2Scheme = z.infer<typeof formStep2Scheme>;
