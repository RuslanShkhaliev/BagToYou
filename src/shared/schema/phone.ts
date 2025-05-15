import { z } from 'zod';
import { MESSAGES } from './validation-messages';

// Регулярное выражение для международных номеров телефона
// Поддерживает форматы:
// - +XX XXX XXX XXXX
// - +XXXXXXXXXXXX
// - XXXXXXXXXXXX
// Допускает пробелы, дефисы, скобки
const INTERNATIONAL_PHONE_REGEX =
	/^\+?[0-9]{1,4}?[-.\s]?(\([0-9]{1,4}\)[-.\s]?)?[0-9]{1,12}[-.\s]?[0-9]{1,12}$/;

export const isValidPhoneNumber = (phone: string): boolean => {
	return INTERNATIONAL_PHONE_REGEX.test(phone);
};

// Улучшенная схема для телефона
export const phoneSchema = z
	.string()
	.min(1, { message: MESSAGES.REQUIRED('Телефон') })
	.refine(isValidPhoneNumber, {
		message: MESSAGES.INVALID_FORMAT('телефона'),
	});
