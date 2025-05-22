import { MessengerType, TransportType } from '@shared/enums';
import { adSchema } from '@shared/schemas/adSchema';
import { dateRangeSchema } from '@shared/schemas/index';
import { z } from 'zod';

export const adDeliverySchema = adSchema.extend({
	dates: dateRangeSchema.refine((data) => data.startDate && data.endDate, {
		message: 'Пожалуйста, укажите даты поездки',
	}),
	transport: z.nativeEnum(TransportType),
	messenger: z.array(z.nativeEnum(MessengerType)).default([MessengerType.fb]),
});

export const adDeliveryCreateSchema = adDeliverySchema.omit({
	userId: true,
	id: true,
});

export type AdDelivery = z.infer<typeof adDeliverySchema>;
export type AdDeliveryCreate = z.infer<typeof adDeliveryCreateSchema>;
