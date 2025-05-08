/**
 * Типы объявлений, которые может создать пользователь
 */
export enum AdType {
	DELIVERY = 'delivery',
	PICKUP = 'pickup',
}

export enum RequestRole {
	Sender,
	Deliver,
}

export enum TransportType {
	Car,
	Plane,
	Bike,
	Ship,
	Train,
	Bus,
}

export enum RequestStatus {
	Draft,
	Moderation,
	Active,
	Progress,
	Expired,
	Completed,
	Hidden,
	Rejected,
	Cancelled,
}

export enum MessagePlatform {
	Tg,
	Wa,
	Vb,
	Ig,
	Fb,
}

export enum Direction {
	From = 'from',
	To = 'to',
}

export enum DateRange {
	Start = 'start',
	End = 'end',
}
