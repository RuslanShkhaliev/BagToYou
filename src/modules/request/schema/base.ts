import { MessagePlatform, RequestRole, RequestStatus } from '@/common';
import { z } from 'zod';

export const baseRequestSchema = z.object({
	role: z.nativeEnum(RequestRole).default(RequestRole.Sender),
	status: z.nativeEnum(RequestStatus).default(RequestStatus.Draft),
});
export type RequestBase = z.infer<typeof baseRequestSchema>;

export const packageInfoSchema = z.object({
	description: z.string().default(''),
	weight: z.string({ message: 'Укажите вес посылки' }).default(''),
	length: z.string({ message: 'Укажите длину посылки' }).default(''),
	width: z.string({ message: 'Укажите ширину посылки' }).default(''),
	height: z.string({ message: 'Укажите высоту посылки' }).default(''),
	photos: z.array(z.string()).default([]),
});
export type PackageInfo = z.infer<typeof packageInfoSchema>;

export const recipientInfoSchema = z.object({
	name: z.string({ message: 'Укажите имя' }).default(''),
	phone: z.string({ message: 'Укажите номер' }).default(''),
	messenger: z.nativeEnum(MessagePlatform).default(MessagePlatform.Tg),
});

export type RecipientInfo = z.infer<typeof recipientInfoSchema>;
