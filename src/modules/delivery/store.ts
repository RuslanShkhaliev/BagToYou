import { zustandStorage } from '@/lib/storage';
import { Location } from '@/shared/schema';
import { TransportType } from 'src/shared';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

export const STORAGE_DELIVERY_KEY = 'delivery_draft';

export interface RouteSelection {
	from: Location | null;
	to: Location | null;
}

interface DeliveryStore {
	route: RouteSelection; // Step 1 — маршрут
	transport: TransportType; // Step 1 — транспортное средство
	date: Date; // Step 1 — дата

	senderInfo: {
		name: string;
		surname: string;
		phone: string;
	}; // Step 2 — информация о получателе

	parcelInfo: {
		weight: string;
		length: string;
		width: string;
		height: string;
		type: string;
		media: string[]; // или MediaAsset[], если тип определён
	}; // Step 2 — посылка

	description: string; // Step 2 — описание
	rewards: string; // Step 2 — цена
	media: string[]; // Step 2 — файлы вне parcelInfo (если нужно)
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
			from: null,
			to: null,
		},
		transport: TransportType.Plane,
		date: new Date(),
		senderInfo: {
			name: '',
			surname: '',
			phone: '',
		},
		parcelInfo: {
			weight: '',
			length: '',
			width: '',
			height: '',
			type: '',
			media: [],
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
			updateField: (field, value) => set(() => ({ [field]: value })),
			updateState: (patch) => set((state) => ({ ...state, ...patch })),
			reset: () => set(() => defaultState()),
		}),
		{
			name: STORAGE_DELIVERY_KEY,
			storage: zustandStorage,
		},
	),
);
