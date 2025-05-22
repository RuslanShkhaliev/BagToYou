import { zustandStorage } from '@lib/storage';
import { AdStatus, AdType } from '@shared/api/models/ad';
import { MessengerType } from '@shared/enums';
import { AdShipmentCreate } from '@shared/schemas/adShipment';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';
import { DateType } from './interfaces';

export const STORAGE_SHIPMENT_KEY = 'shipment_offer';

interface Actions {
	updateState: (patch: Partial<AdShipmentCreate>) => void;
	reset: () => void;
}

type ShipmentCreateStore = AdShipmentCreate & Actions;
const defaultState = (): AdShipmentCreate => {
	return {
		name: '',
		status: AdStatus.Draft,
		type: AdType.Shipment,
		metrics: {
			comments: 0,
			likes: 0,
			views: 0,
		},
		responses: [],
		route: {
			from: { city: '' },
			to: { city: '' },
		},
		date: {
			type: DateType.BY_DATE,
			value: undefined,
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

export const useShipmentStore = create<
	ShipmentCreateStore,
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
