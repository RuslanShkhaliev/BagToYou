import { TransportType } from '@/common';
import { zustandStorage } from '@/common/storage';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

export const STORAGE_DELIVERY_KEY = 'delivery_draft';

export interface DeliveryRoute {
	from: string;
	to: string;
}
interface DeliveryStore {
	route: DeliveryRoute;
	conditions: string;
	transport: TransportType;
	rewards: string;
	date: Date;
}

interface Actions {
	update: <K extends keyof DeliveryRoute, V extends DeliveryRoute[K]>(field: K, value: V) => void;
	reset: () => void;
}

const defaultState = (): DeliveryStore => {
	return {
		route: {
			from: '',
			to: '',
		},
		conditions: '',
		transport: TransportType.Plane,
		rewards: '',
		date: new Date(),
	};
};

export const useDeliveryStore = create<DeliveryStore & Actions, [['zustand/persist', unknown]]>(
	persist(
		(set) => ({
			...defaultState(),
			update: (field, value) =>
				set((state) => ({
					...state,
					[field]: value,
				})),
			reset: () => set(() => defaultState()),
		}),
		{
			name: STORAGE_DELIVERY_KEY,
			storage: zustandStorage,
		},
	),
);
