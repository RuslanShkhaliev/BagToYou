import { TransportType } from '@/common';
import { baseRequestSchema, routeRequestSchema } from '@/modules/request/schema';
import { z } from 'zod';

export const deliveryRequestSchema = baseRequestSchema.extend({
	route: routeRequestSchema.default({}),
	transport: z.nativeEnum(TransportType).default(TransportType.Plane),
	conditions: z.string().optional().default(''),
	rewards: z.string().default(''),
});
export type DeliveryRequest = z.infer<typeof deliveryRequestSchema>;
