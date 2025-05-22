import { zustandStorage } from '@lib/storage';
import { AdStatus, AdType } from '@shared/api/models/ad';
import { MessengerType, TransportType } from '@shared/enums';
import { AdDelivery } from '@shared/schemas/adDelivery';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

interface Actions {
	updateState: (value: Partial<AdDelivery>) => void;
	reset: () => void;
}

const STORAGE_DELIVERY_KEY = 'delivery_request';

const defaultState = (): AdDelivery => {
	return {
		name: '',
		status: AdStatus.Draft,
		metrics: {
			comments: 0,
			likes: 0,
			views: 0,
		},
		type: AdType.Shipment,
		media: [],
		responses: [],
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

type DeliveryStore = AdDelivery & Actions;

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
