import { FieldValue, Timestamp } from 'firebase/firestore';

export interface RequestMetadata {
	userId: string;
	createdAt: FieldValue;
	updatedAt: FieldValue;
}

export interface ResponseMetadata {
	id: string;
	userId: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export type AdRequestModel<T> = T & RequestMetadata;
export type AdResponseModel<T> = T & ResponseMetadata;
