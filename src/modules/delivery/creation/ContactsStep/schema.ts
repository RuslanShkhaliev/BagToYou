import { z } from 'zod';
const contactSchema = z.object({
	name: z.string().min(1, {
		message: 'Имя обязательно',
	}),
	surname: z.string().min(1, {
		message: 'Фамилия обязательна',
	}),
	phone: z
		.string()
		.min(1, { message: 'Телефон обязателен' })
		.refine(
			(val) => {
				if (!val.length) return true;

				return /^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(
					val,
				);
			},
			{ message: 'Неверный формат телефона' },
		),
});
export const formContactsSchema = z.object({
	senderInfo: contactSchema,
	recipientInfo: contactSchema,
});

export type FormContactsScheme = z.infer<typeof formContactsSchema>;
