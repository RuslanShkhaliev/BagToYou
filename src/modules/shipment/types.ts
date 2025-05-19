import { AdStatus } from '@shared/enums';
import { MediaAssetSchema } from '@shared/schema';

export interface ShipmentAd {
	id: string;
	title: string;
	description: string;
	media: MediaAssetSchema[];
	rewards: number;
	status: AdStatus;
	createdAt: string;
	updatedAt: string;
}
