import { zodResolver } from '@hookform/resolvers/zod';
import { locationSchema } from '@shared/schema';
import { z } from 'zod';

export const formRouteSchema = z.object({
	route: z
		.object({
			from: locationSchema.refine((val) => !!val.city, {
				message: 'Укажите откуда',
			}),
			to: locationSchema.refine((val) => !!val.city, {
				message: 'Укажите куда',
			}),
		})
		.refine(
			(data) => {
				if (!data.from.city && !data.to.city) {
					return true;
				}

				return data.from.city !== data.to.city;
			},
			{
				message: 'Пункты отправления и назначения не должны совпадать',
			},
		),
	dates: z.array(z.string().datetime()).default([]),
});

export const formRouteResolver = zodResolver(formRouteSchema);
