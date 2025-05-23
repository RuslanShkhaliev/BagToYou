import { MessagePlatform } from '@shared/enums';
import { locationSchema } from '@shared/schema';
import { z } from 'zod';

export const senderRoute = z.object({
	from: locationSchema,
	to: locationSchema,
});

export const parcelInfoSchema = z.object({
	weight: z.string({ message: 'Укажите вес посылки' }).default(''),
	length: z.string({ message: 'Укажите длину посылки' }).default(''),
	width: z.string({ message: 'Укажите ширину посылки' }).default(''),
	height: z.string({ message: 'Укажите высоту посылки' }).default(''),
	photos: z.array(z.string()).default([]),
});
export type ParcelInfo = z.infer<typeof parcelInfoSchema>;

export const recipientInfoSchema = z.object({
	name: z.string({ message: 'Укажите имя' }).default(''),
	phone: z.string({ message: 'Укажите номер' }).default(''),
	messenger: z.nativeEnum(MessagePlatform).default(MessagePlatform.Tg),
});

export type RecipientInfo = z.infer<typeof recipientInfoSchema>;

export const senderRequestSchema = z.object({
	parcel: parcelInfoSchema,
	recipient: recipientInfoSchema,
	route: senderRoute,
	rewards: z.string().default(''),
});
export type SenderRequest = z.infer<typeof senderRequestSchema>;
