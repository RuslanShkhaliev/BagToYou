import { TransportType } from '@shared/enums';
import { DateSelection, Profile } from '@shared/interface';
import { ParcelInfo } from '@shared/schemas';
import { RouteBaseSchema } from '@shared/schemas/common/location';

export interface DeliveryInfo {
	id: number;
	route: RouteBaseSchema[];
	rewards: number;
	parcelInfo: ParcelInfo;
	media: string[];
	dates: DateSelection;
	author: Profile;
	description?: string;
	transportType: TransportType;
	createdAt: Date;
}
