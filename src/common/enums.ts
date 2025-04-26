export enum RequestRole {
	Sender,
	Receiver,
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
