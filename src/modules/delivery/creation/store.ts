import { zustandStorage } from '@lib/storage';
import { TransportType } from '@shared/enums';
import { Location, ParcelInfo } from '@shared/schema';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

export const STORAGE_DELIVERY_KEY = 'delivery_draft';

export interface RouteSelection {
	from: Location;
	to: Location;
}

interface ContactInfo {
	name: string;
	surname: string;
	phone: string;
}

export interface DeliveryStore {
	route: RouteSelection;
	transport: TransportType;
	dates: string[]; // ISO строки дат

	senderInfo: ContactInfo;
	recipientInfo: ContactInfo;

	parcelInfo: ParcelInfo;

	description: string;
	rewards: string;
	media: string[];
}

interface Actions {
	updateField: <T extends DeliveryStore, K extends keyof T>(
		field: K,
		value: T[K],
	) => void;
	updateState: (patch: Partial<DeliveryStore>) => void;
	reset: () => void;
}

const defaultState = (): DeliveryStore => {
	return {
		route: {
			from: { city: '' },
			to: { city: '' },
		},
		transport: TransportType.Plane,
		dates: [new Date().toISOString()],
		senderInfo: {
			name: '',
			surname: '',
			phone: '',
		},
		recipientInfo: {
			name: '',
			surname: '',
			phone: '',
		},
		parcelInfo: {
			weight: '',
			length: '',
			width: '',
			height: '',
		},
		description: '',
		rewards: '',
		media: [],
	};
};

export const useDeliveryStore = create<
	DeliveryStore & Actions,
	[['zustand/persist', unknown]]
>(
	persist(
		(set) => ({
			...defaultState(),
			updateField: (field, value) =>
				set((state) => ({ ...state, [field]: value })),
			updateState: (patch) => set((state) => ({ ...state, ...patch })),
			reset: () => set(() => defaultState()),
		}),
		{
			name: STORAGE_DELIVERY_KEY,
			storage: zustandStorage,
		},
	),
);
