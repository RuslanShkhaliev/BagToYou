import { zustandStorage } from '@lib/storage';
import { MessengerType, TransportType } from '@shared/enums';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';
import { DeliveryCreationSchema } from './schema';

interface Actions {
	updateState: (value: Partial<DeliveryCreationSchema>) => void;
	reset: () => void;
}

const STORAGE_DELIVERY_KEY = 'delivery_request';

const defaultState = (): DeliveryCreationSchema => {
	return {
		route: {
			from: { city: '' },
			to: { city: '' },
		},
		transport: TransportType.Plane,
		dates: {
			startDate: '',
			endDate: '',
		},
		parcelInfo: {
			weight: '',
			length: '',
			width: '',
			height: '',
		},
		description: '',
		rewards: '',
		messenger: [MessengerType.fb],
	};
};

type DeliveryStore = DeliveryCreationSchema & Actions;

export const useDeliveryStore = create<
	DeliveryStore,
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
