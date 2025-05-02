import { TransportType } from '@/common';
import { Location } from '@/common/schema';
import { zustandStorage } from '@/lib/storage';
import { FormStep1Scheme, FormStep2Scheme } from '@/modules/delivery/schema';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

export const STORAGE_DELIVERY_KEY = 'delivery_draft';


export interface DeliveryRoute {
	from: Location | null;
	to: Location | null;
}


interface DeliveryStore {
	step1: Omit<FormStep1Scheme, 'route'> & { route: DeliveryRoute };
	step2: FormStep2Scheme;
}


interface Actions {
	saveStep1: (step1: Partial<FormStep1Scheme>) => void;
	saveStep2: (step2: Partial<FormStep2Scheme>) => void;
	reset: () => void;
}


const defaultState = (): DeliveryStore => {
	return {
		step1: {
			route: {
				from: null,
				to: null,
			},
			transport: TransportType.Plane,
			date: new Date(),
		},
		step2: {
			name: '',
			surname: '',
			phone: '',
			width: '',
			height: '',
			length: '',
			weight: '',
			description: '',
			rewards: '',
			media: [],
		},
	};
};

export const useDeliveryStore = create<
	DeliveryStore & Actions,
	[['zustand/persist', unknown]]
>(
	persist(
		(set) => ({
			...defaultState(),
			saveStep1: (patch) =>
				set((state) => ({ step1: { ...state.step1, ...patch } })),
			saveStep2: (patch) =>
				set((state) => ({ step2: { ...state.step2, ...patch } })),
			reset: () => set(() => defaultState()),
		}),
		{
			name: STORAGE_DELIVERY_KEY,
			storage: zustandStorage,
		},
	),
);
