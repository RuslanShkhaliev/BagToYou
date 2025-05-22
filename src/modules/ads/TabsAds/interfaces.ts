import { UserAdModel } from '@modules/ads/api';
import { AdStatus } from '@shared/api/models/ad';

export interface TabRoute {
	key: AdStatus;
	title: string;
	data: UserAdModel[];
	count: number;
}
