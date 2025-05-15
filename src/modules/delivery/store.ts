import { zustandStorage } from '@lib/storage';
import { MessengerType, TransportType } from '@shared/enums';
import { ParcelInfo, RouteSchema } from '@shared/schema';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

export interface DeliveryState {
	route: RouteSchema;
	dates: string[];
	transport: TransportType;

	parcelInfo: ParcelInfo;
	description: string;
	rewards: string;
	messenger: MessengerType[];
}

interface Actions {
	updateState: (value: Partial<DeliveryState>) => void;
	reset: () => void;
}

const STORAGE_DELIVERY_KEY = 'delivery_request';

const defaultState = (): DeliveryState => {
	return {
		route: {
			from: { city: '' },
			to: { city: '' },
		},
		transport: TransportType.Car,
		dates: [],
		parcelInfo: {
			weight: 0,
			length: 0,
			width: 0,
			height: 0,
		},
		description: '',
		rewards: '',
		messenger: [],
	};
};

export const useDeliveryStore = create<
	DeliveryState & Actions,
	[['zustand/persist', unknown]]
>(
	persist(
		(set) => ({
			...defaultState(),
			updateState: (val) => set((state) => ({ ...state, ...val })),
			reset: () => set(() => defaultState()),
		}),
		{
			name: STORAGE_DELIVERY_KEY,
			storage: zustandStorage,
		},
	),
);
