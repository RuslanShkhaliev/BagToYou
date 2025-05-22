import { MessengerType } from '@shared/enums';
import { phoneSchema } from '@shared/schemas/common/phone';
import { MESSAGES } from '@shared/schemas/common/validation-messages';
import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().min(1, {
		message: MESSAGES.REQUIRED('Name'),
	}),
	surname: z.string().min(1, {
		message: MESSAGES.REQUIRED('Surname'),
	}),
	phone: phoneSchema,

	messenger: z.array(z.nativeEnum(MessengerType)),
});

export type ContactSchema = z.infer<typeof contactSchema>;
