import { Direction, RequestRole, TransportType } from '@/common';
import { DateInputGroup } from '@/components/DateInputGroup';
import { DatesSheet, DatesSheetRef } from '@/components/DatesSheet';
import { DateSelection } from '@/components/interfaces';
import { RoutesInputGroup } from '@/components/RoutesInputGroup';
import { RoutesSheet, RoutesSheetRef } from '@/components/RoutesSheet';
import { StackScreen } from '@/components/StackScreen';
import { TransportGroup } from '@/components/TransportGroup';
import { RoleToggleGroup } from '@/modules/request/components/RoleToggleGroup';
import { useRequestCreationStore } from '@/modules/request/store';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Form, ScrollView, YStack } from 'tamagui';

export const NewRequestScreen = () => {
	const store = useRequestCreationStore();

	const state = useRequestCreationStore.getState();
	const updateByRole = {
		[RequestRole.Receiver]: store.updateReceiver,
		[RequestRole.Sender]: store.updateSender,
	};

	const [role, setRole] = useState<RequestRole>(state.role ?? RequestRole.Receiver);
	const [routes, setRoute] = useState<{ [Direction.From]: string; [Direction.To]: string }>({
		from: '',
		to: '',
	});
	const [routeDir, setRouteDir] = useState(Direction.From);
	const [dates, setDates] = useState<DateSelection>({ from: new Date() });
	const [dateDir, setDateDir] = useState(Direction.From);
	const [transportType, setTransportType] = useState(TransportType.Plane);
	const isReceiver = useMemo(() => role === RequestRole.Receiver, [role]);

	const changeRole = (role: RequestRole) => {
		store.updateState({ role });
		setRole(role);
	};

	const onSelectRoute = useCallback((routes) => {
		setRoute((state) => ({ ...state, ...routes }));
	}, []);

	const selectTransport = (val: TransportType) => {
		setTransportType(() => val);
	};

	const routesSheetRef = useRef<RoutesSheetRef>(null);

	const routeSelect = (dir: Direction) => {
		routesSheetRef.current?.open(dir);
	};
	const onRouteFromSelect = () => routeSelect(Direction.From);
	const onRouteToSelect = () => routeSelect(Direction.To);

	const dateFrom = useMemo(() => dates.from.toString(), [dates.from]);
	const dateTo = useMemo(() => dates.to?.toString() ?? '', [dates.to]);

	const onSelectDates = (dates: DateSelection) => {
		setDates((state) => ({ ...state, ...dates }));
	};

	const datesSheetRef = useRef<DatesSheetRef>(null);
	const dateSheetOpen = (dir: Direction) => {
		console.log('dateSheetOpen', datesSheetRef.current);
		datesSheetRef.current?.open(dir);
	};

	const onFromPress = () => dateSheetOpen(Direction.From);
	const onToPress = () => dateSheetOpen(Direction.To);

	const router = useRouter();
	const nextStep = () => {
		if (isReceiver) {
			router.push('/request/deliver');
		} else {
			router.push('/request/sender');
		}
	};

	return (
		<StackScreen>
			<ScrollView>
				<Form padding="$2" gap="$6">
					<YStack gap="$4">
						<RoleToggleGroup onChange={changeRole} role={role} />
						<RoutesInputGroup
							to={routes.to}
							from={routes.from}
							onFromSelect={onRouteFromSelect}
							onToSelect={onRouteToSelect}
						/>
						<DateInputGroup
							onFromPress={onFromPress}
							onToPress={onToPress}
							fromVal={dateFrom}
							range={isReceiver}
							toVal={dateTo}
						/>
						<RoutesSheet ref={routesSheetRef} onSelect={onSelectRoute} routes={routes} />
						<DatesSheet ref={datesSheetRef} dates={dates} onSelect={onSelectDates}></DatesSheet>

						{isReceiver && <TransportGroup onChange={selectTransport} value={transportType} />}
					</YStack>
					<Form.Trigger asChild>
						<Button size="$5" fontSize="18px" onPress={nextStep}>
							Продолжить
						</Button>
					</Form.Trigger>
				</Form>
			</ScrollView>
		</StackScreen>
	);
};
