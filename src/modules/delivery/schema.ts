import { MessengerType, TransportType } from '@shared/enums';
import {
	dateRangeSchema,
	parcelInfoSchema,
	routeCreationSchema,
} from '@shared/schema';
import { z } from 'zod';

export const deliveryCreationSchema = z.object({
	route: routeCreationSchema,
	dates: dateRangeSchema,
	transport: z.nativeEnum(TransportType),
	rewards: z.string(),
	description: z.string(),
	parcelInfo: parcelInfoSchema,
	messenger: z.array(z.nativeEnum(MessengerType)).default([MessengerType.fb]),
});

export type DeliveryCreationSchema = z.infer<typeof deliveryCreationSchema>;
