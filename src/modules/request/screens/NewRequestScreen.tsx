import { Direction, RequestRole, RequestStatus, TransportType } from '@/common';
import { DateInputGroup } from '@/components/DateSelector/DateInputGroup';
import { DatesSheet, DatesSheetRef } from '@/components/DateSelector/DatesSheet';
import { DateSelection } from '@/components/DateSelector/interfaces';
import { RoutesInputGroup } from '@/components/RoutesSelector/RoutesInputGroup';
import { RoutesSheet, RoutesSheetRef } from '@/components/RoutesSelector/RoutesSheet';
import { TransportGroup } from '@/components/TransportGroup';
import { RoleToggleGroup } from '@/modules/request/components/RoleToggleGroup';
import { useRequestCreationStore } from '@/modules/request/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, ScrollView, YStack } from 'tamagui';

interface FormRoute {
	from: string;
	to: string;
}
export const NewRequestScreen = () => {
	const store = useRequestCreationStore();

	const state = useRequestCreationStore.getState();
	const updateByRole = {
		[RequestRole.Receiver]: store.updateReceiver,
		[RequestRole.Sender]: store.updateSender,
	};

	const [role, setRole] = useState<RequestRole>(state.role ?? RequestRole.Receiver);
	const [routes, setRoute] = useState<{ from: string; to: string }>({ from: '', to: '' });
	const [dates, setDates] = useState<DateSelection>({ from: new Date() });
	const [transportType, setTransportType] = useState(TransportType.Plane);
	const isReceiver = useMemo(() => role === RequestRole.Receiver, [role]);

	useEffect(() => {
		console.log(state, 'state changed');
	}, [state]);

	const changeRole = (role: RequestRole) => {
		store.updateState({ role });
		setRole(role);
	};

	const changeStatus = () => {
		store.updateState({ status: RequestStatus.Active });
	};

	const onSelectRoute = useCallback((dir: Direction, route: string) => {
		setRoute((state) => ({ ...state, [dir]: route }));
	}, []);

	const onSelectDates = (dates: DateSelection) => {
		console.log(dates);
	};

	const selectTransport = (val: TransportType) => {
		setTransportType(() => val);
	};

	const datesSheetRef = useRef<DatesSheetRef>(null);
	const dateSheetOpen = (dir: Direction) => {
		datesSheetRef.current?.open(dir);
	};

	const onFromPress = () => dateSheetOpen(Direction.From);
	const onToPress = () => dateSheetOpen(Direction.To);

	const updateDates = (dates: DateSelection) => {
		setDates((state) => ({ ...state, ...dates }));
	};

	const dateFrom = useMemo(() => dates.from.toString(), [dates.from]);
	const dateTo = useMemo(() => dates.to?.toString() ?? '', [dates.to]);

	const routesSheetRef = useRef<RoutesSheetRef>(null);
	const routeSelect = (dir: Direction) => {
		routesSheetRef.current?.open(dir, routes[dir]);
	};
	const onRouteFromSelect = () => routeSelect(Direction.From);
	const onRouteToSelect = () => routeSelect(Direction.To);

	return (
		<ScrollView>
			<YStack padding="$2" gap="$6" fullscreen position="absolute" zIndex="10000">
				<YStack gap="$4">
					<RoleToggleGroup onChange={changeRole} role={role} />
					<RoutesInputGroup
						to={routes.to}
						from={routes.from}
						onFromSelect={onRouteFromSelect}
						onToSelect={onRouteToSelect}
					/>
					<RoutesSheet onSelect={onSelectRoute} ref={routesSheetRef} />
					<DateInputGroup
						onFromPress={onFromPress}
						onToPress={onToPress}
						fromVal={dateFrom}
						range={isReceiver}
						toVal={dateTo}
					/>
					<DatesSheet ref={datesSheetRef} onSelect={updateDates} dates={dates} range={isReceiver} />

					{isReceiver && <TransportGroup onChange={selectTransport} value={transportType} />}
				</YStack>
				<Button size="$5" fontSize="18px" onPress={changeStatus}>
					Продолжить
				</Button>
			</YStack>
		</ScrollView>
	);
};
