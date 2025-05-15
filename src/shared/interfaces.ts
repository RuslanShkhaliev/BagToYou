import { TransportType } from '@shared/enums';
import { DateSelection, Profile } from '@shared/interface';
import { ParcelInfo, RouteSchema } from '@shared/schema';

export interface DeliveryInfo {
	id: number;
	route: RouteSchema[];
	rewards: number;
	parcelInfo: ParcelInfo;
	media: string[];
	dates: DateSelection;
	author: Profile;
	description?: string;
	transportType: TransportType;
	createdAt: Date;
}
