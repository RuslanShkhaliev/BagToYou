import { TransportType } from '@shared/enums';
import { DateSelection, Profile } from '@shared/interface';
import { RouteBaseSchema } from '@shared/schemas/common/location';
import { ParcelInfo } from 'src/shared/schemas';

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
