import { z } from 'zod';

export const dateISOSchema = z.string().datetime();

export type DateISOSchema = z.infer<typeof dateISOSchema>;

export const dateRangeSchema = z.object({
	startDate: z
		.string()
		.datetime()
		.nonempty({ message: 'Укажите дату отправления' }),
	endDate: z
		.string()
		.datetime()
		.nonempty({ message: 'Укажите дату прибытия' }),
});
export type DateRangeSchema = z.infer<typeof dateRangeSchema>;

export const dateSearchSchema = z.object({
	startDate: z.string().datetime().optional(),
	endDate: z.string().datetime().optional(),
});
export type DateSearchSchema = z.infer<typeof dateSearchSchema>;
