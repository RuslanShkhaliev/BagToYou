import { z } from 'zod';
import { Mode, RouteTargetType } from './types';

export const locationSearchParamsSchema = z.object({
	mode: z.nativeEnum(Mode).default(Mode.FromTo),
	from: z.string().optional().default(''),
	to: z.string().optional().default(''),
	activeInput: z.nativeEnum(RouteTargetType).default(RouteTargetType.From),
	returnTo: z.string().optional().default('/'),
});

export type LocationSearchParams = z.infer<typeof locationSearchParamsSchema>;
