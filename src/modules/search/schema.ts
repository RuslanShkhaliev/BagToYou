import { routeCreationSchema } from '@shared/schema/location';
import { z } from 'zod';

export const routeSearchForSenderSchema = z.object({
	from: routeCreationSchema.shape.from,
	to: routeCreationSchema.shape.to,
});

export const routeSearchForRecipientSchema = z.object({
	from: routeCreationSchema.shape.from,
	to: routeCreationSchema.shape.to,
});
