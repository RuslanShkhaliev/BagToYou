import { TransportType } from '@/common/enums';
import { DateSelection, Profile } from '@/common/interface';
import { ParcelInfo, RouteSchema } from '@/common/schema';


export interface DeliveryInfo {
	id: number;
	route: RouteSchema[];
	rewards: number;
	parcelInfo: ParcelInfo;
	dates: DateSelection;
	author: Profile;
	description?: string;
	transportType: TransportType;
	createdAt: Date;
}
