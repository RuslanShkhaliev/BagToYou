import { MessengerType } from '@shared/enums';
import {
	dateISOSchema,
	mediaAssetSchema,
	parcelInfoSchema,
	phoneSchema,
	routeCreationSchema,
} from '@shared/schema';
import { z } from 'zod';
import { DateType } from './interfaces';

const MESSAGES = {
	REQUIRED: (field: string) => `${field} обязателен`,
	INVALID_FORMAT: (field: string) => `Неверный формат ${field}`,
};

const contactSchema = z.object({
	name: z.string().min(1, {
		message: MESSAGES.REQUIRED('Имя'),
	}),
	surname: z.string().min(1, {
		message: MESSAGES.REQUIRED('Фамилия'),
	}),
	phone: phoneSchema,

	messenger: z.array(z.nativeEnum(MessengerType)),
});

const dateShipmentSchema = z.object({
	type: z.nativeEnum(DateType).default(DateType.BY_DATE),
	value: dateISOSchema.optional(),
});

export type DateShipmentSchema = z.infer<typeof dateShipmentSchema>;

export const shipmentCreationSchema = z.object({
	route: routeCreationSchema,
	parcelInfo: parcelInfoSchema,
	date: dateShipmentSchema,
	media: z.array(mediaAssetSchema),
	description: z.string().optional(),
	rewards: z.string().optional().default(''),
	senderInfo: contactSchema,
	recipientInfo: contactSchema,
});

export type ShipmentCreationSchema = z.infer<typeof shipmentCreationSchema>;
