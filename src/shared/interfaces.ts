import { TransportType } from '@shared/enums';
import { DateSelection, Profile } from '@shared/interface';
import { ParcelInfo } from '@shared/schema';
import { RouteBaseSchema } from '@shared/schema/location';

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
