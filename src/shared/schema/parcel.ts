import { z } from 'zod';
import { toNumber } from './common';

export const parcelInfoSchema = z.object({
	weight: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите вес посылки' })
			.min(0.01, { message: 'Вес должен быть больше 0' }),
	),
	length: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите длину посылки' })
			.min(0.01, { message: 'Длина должна быть больше 0' }),
	),
	width: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите ширину посылки' })
			.min(0.01, { message: 'Ширина должна быть больше 0' }),
	),
	height: z.preprocess(
		toNumber,
		z
			.number({ invalid_type_error: 'Укажите высоту посылки' })
			.min(0.01, { message: 'Высота должна быть больше 0' }),
	),
});
export type ParcelInfo = z.infer<typeof parcelInfoSchema>;
