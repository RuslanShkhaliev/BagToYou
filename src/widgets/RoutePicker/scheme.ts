import { InputTargetType } from '@/widgets/RoutePicker/types';
import { z } from 'zod';

export enum Mode {
	FromTo = 'from-to',
	ToOnly = 'to-only',
}

export const locationSearchParamsSchema = z.object({
	mode: z.nativeEnum(Mode).default(Mode.FromTo),
	from: z.string().optional().default(''),
	to: z.string().optional().default(''),
	activeInput: z.nativeEnum(InputTargetType).default(InputTargetType.From),
	returnTo: z.string().optional().default('/'),
});

export type LocationSearchParams = z.infer<typeof locationSearchParamsSchema>;
