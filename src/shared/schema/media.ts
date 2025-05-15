import { z } from 'zod';

export const mediaAssetSchema = z.object({
	uri: z.string(),
	fileName: z.string().nullable().optional(),
	assetId: z.string().nullable().optional(),
	type: z.string().optional(),
	width: z.number(),
	height: z.number(),
	fileSize: z.number().optional(),
	mimeType: z.string().optional(),
	duration: z.number().nullable().optional(),
});

export type MediaAssetSchema = z.infer<typeof mediaAssetSchema>;
