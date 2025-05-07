import { Location } from '@shared/schema';

export enum RouteTargetType {
	From = 'from',
	To = 'to',
}

export enum Mode {
	FromTo = 'from-to',
	ToOnly = 'to-only',
}
export interface RouteSelection {
	[RouteTargetType.From]: Location | null;
	[RouteTargetType.To]: Location | null;
}
