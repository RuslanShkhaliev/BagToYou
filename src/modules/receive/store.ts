import { zustandStorage } from '@lib/storage';
import { SenderRequest } from '@modules/receive/schema';
import { RequestRole, RequestStatus, TransportType } from '@shared/enums';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

type NullableProps<T extends object> = {
	[Key in keyof T]: T[Key] | null | undefined;
};

interface ReceiverState {
	conditions: ReceiverRequest['conditions'];
	transport: ReceiverRequest['transport'];
	route: Partial<ReceiverRequest['route']>;
	rewards: string;
}

interface SenderState
	extends NullableProps<
		Pick<SenderRequest, 'package' | 'recipient' | 'route'>
	> {
	rewards: string;
}

interface RequestCreationStore extends RequestBase {
	sender: SenderState;
	receiver: ReceiverState;
}

interface Actions {
	updateState: (value: Partial<RequestBase>) => void;
	updateSender: (value: Partial<SenderState>) => void;
	updateReceiver: (value: Partial<ReceiverState>) => void;
	reset: () => void;
}

const STORAGE_REQUEST_KEY = 'delivery_request';

const defaultState = (): RequestCreationStore => {
	return {
		role: RequestRole.Sender,
		status: RequestStatus.Draft,
		sender: {
			package: null,
			recipient: null,
			route: null,
			rewards: '',
		},
		receiver: {
			route: [],
			conditions: '',
			transport: TransportType.Plane,
			rewards: '',
		},
	};
};

export const useRequestCreationStore = create<
	RequestCreationStore & Actions,
	[['zustand/persist', unknown]]
>(
	persist(
		(set) => ({
			...defaultState(),
			updateState: (val) => set((state) => ({ ...state, ...val })),
			updateSender: (sender) =>
				set((state) => ({ ...state, sender: { ...state.sender, ...sender } })),
			updateReceiver: (receiver) =>
				set((state) => ({
					...state,
					receiver: { ...state.receiver, ...receiver },
				})),
			reset: () => set(() => defaultState()),
		}),
		{
			name: STORAGE_REQUEST_KEY,
			storage: zustandStorage,
		},
	),
);
