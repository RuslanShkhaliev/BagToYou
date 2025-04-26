import { TransportType } from '@/common';
import { dateRangeSchema, locationSchema, routePointSchema } from '@/common/schema';
import {
	baseRequestSchema,
	parcelInfoSchema,
	recipientInfoSchema,
} from '@/modules/request/schema/base';
import { z } from 'zod';

export const senderRoute = z.object({
	from: locationSchema,
	to: locationSchema,
	exact: z.boolean().default(false),
	date: dateRangeSchema.optional(),
});
export const senderRequestSchema = baseRequestSchema.extend({
	package: parcelInfoSchema,
	recipient: recipientInfoSchema,
	route: senderRoute,
	rewards: z.string().default(''),
});
export type SenderRequest = z.infer<typeof senderRequestSchema>;

export const routeRequestSchema = z
	.object({
		from: routePointSchema,
		to: routePointSchema,
	})
	.refine((data) => data.from.location !== data.to.location, {
		message: 'Пункты отправления и назначения не должны совпадать',
		path: ['to.location'],
	});

export const deliveryRequestSchema = baseRequestSchema.extend({
	route: z.array(routeRequestSchema).nonempty(),
	transport: z.nativeEnum(TransportType).default(TransportType.Plane),
	conditions: z.string().optional().default(''),
	rewards: z.string().default(''),
});
export type ReceiverRequest = z.infer<typeof deliveryRequestSchema>;
