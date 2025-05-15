import { z } from 'zod';

export const dateSchema = z.string().datetime();

export type DateSchema = z.infer<typeof dateSchema>;

export const dateRangeSchema = z.object({
	from: dateSchema,
	to: dateSchema,
});
export type DateRangeSchema = z.infer<typeof dateRangeSchema>;
