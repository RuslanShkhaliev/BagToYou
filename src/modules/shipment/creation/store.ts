import { zustandStorage } from '@lib/storage';
import { MessengerType } from '@shared/enums';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';
import { ShipmentCreationSchema } from './schema';

export const STORAGE_SHIPMENT_KEY = 'shipment_offer';

interface Actions {
	updateState: (patch: Partial<ShipmentCreationSchema>) => void;
	reset: () => void;
}

const defaultState = (): ShipmentCreationSchema => {
	return {
		route: {
			from: { city: '' },
			to: { city: '' },
		},
		dates: {
			from: new Date().toISOString(),
		},
		senderInfo: {
			name: '',
			surname: '',
			phone: '',
			messenger: [MessengerType.fb],
		},
		recipientInfo: {
			name: '',
			surname: '',
			phone: '',
			messenger: [MessengerType.fb],
		},
		parcelInfo: {
			weight: 0,
			length: 0,
			width: 0,
			height: 0,
		},
		description: '',
		rewards: 0,
		media: [],
	};
};

export const useShipmentStore = create<
	ShipmentCreationSchema & Actions,
	[['zustand/persist', unknown]]
>(
	persist(
		(set) => ({
			...defaultState(),
			updateState: (patch) => set((state) => ({ ...state, ...patch })),
			reset: () => set(() => defaultState()),
		}),
		{
			name: STORAGE_SHIPMENT_KEY,
			storage: zustandStorage,
		},
	),
);
