import { MessengerType } from '@shared/enums';
import {
	dateSchema,
	mediaAssetSchema,
	parcelInfoSchema,
	phoneSchema,
	routeSchema,
} from '@shared/schema';
import { z } from 'zod';

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

export const shipmentCreationSchema = z.object({
	route: routeSchema,
	parcelInfo: parcelInfoSchema,
	media: z.array(mediaAssetSchema),
	dates: z.object({
		from: dateSchema.optional(),
		to: dateSchema.optional(),
	}),
	description: z.string().optional(),
	rewards: z.number().optional(),
	senderInfo: contactSchema,
	recipientInfo: contactSchema,
});

export type ShipmentCreationSchema = z.infer<typeof shipmentCreationSchema>;
