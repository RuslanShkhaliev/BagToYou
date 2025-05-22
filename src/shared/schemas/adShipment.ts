import { DateType } from '@modules/shipment/creation/interfaces';
import { adSchema } from '@shared/schemas/adSchema';
import { contactSchema } from '@shared/schemas/common/contact';
import { dateISOSchema } from '@shared/schemas/common/date';
import { z } from 'zod';

const dateShipmentSchema = z.object({
	type: z.nativeEnum(DateType).default(DateType.BY_DATE),
	value: dateISOSchema.nullable().default(new Date().toString()),
});

export type DateShipmentSchema = z.infer<typeof dateShipmentSchema>;

export const adShipmentSchema = adSchema.extend({
	date: dateShipmentSchema,
	senderInfo: contactSchema,
	recipientInfo: contactSchema,
});

export const adShipmentCreateSchema = adShipmentSchema.omit({
	id: true,
	userId: true,
});

export type AdShipment = z.infer<typeof adShipmentSchema>;
export type AdShipmentCreate = z.infer<typeof adShipmentCreateSchema>;
