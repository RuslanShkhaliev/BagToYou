import { z } from 'zod';

export const parcelInfoSchema = z.object({
	weight: z.string().min(1, { message: 'Вес должен быть больше 0' }),
	length: z.string().min(1, { message: 'Длина должна быть больше 0' }),
	width: z.string().min(1, { message: 'Ширина должна быть больше 0' }),
	height: z.string().min(1, { message: 'Высота должна быть больше 0' }),
});
export type ParcelInfo = z.infer<typeof parcelInfoSchema>;
