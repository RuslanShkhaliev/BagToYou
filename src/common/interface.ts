export interface DateSelection {
	from: Date;
	to: Date;
}
export type DateValue = Date | string;

export interface Profile {
	avatar: string;
	firstName: string;
	lastName: string;
	rating: number;
	reviews: number;
}
