import { z } from 'zod';

export const routeSchema = z.object({
	from: z.string().min(1, 'Укажите пункт отправления'),
	to: z.string().min(1, 'Укажите пункт назначения'),
});
