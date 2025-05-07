export enum InputTargetType {
	From = 'from',
	To = 'to',
}

export enum Mode {
	FromTo = 'from-to',
	ToOnly = 'to-only',
}
export interface RouteSelection {
	from: Location;
	to: Location;
}
