import { Direction, TransportType } from '@/common';
import { DateInputGroup } from '@/components/DateInputGroup';
import { DatesSheet, DatesSheetRef } from '@/components/DatesSheet';
import { DateSelection } from '@/components/interfaces';
import { RoutesInputGroup } from '@/components/RoutesInputGroup';
import { RoutesSheet, RoutesSheetRef } from '@/components/RoutesSheet';
import { StackScreen } from '@/components/StackScreen';
import { TransportGroup } from '@/components/TransportGroup';
import { useRequestCreationStore } from '@/modules/request/store';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Form, ScrollView, YStack } from 'tamagui';

export const SendStep1 = () => {
	const store = useRequestCreationStore();

	const state = useRequestCreationStore.getState();

	const [routes, setRoute] = useState<{ [Direction.From]: string; [Direction.To]: string }>({
		from: '',
		to: '',
	});
	const [routeDir, setRouteDir] = useState(Direction.From);
	const [dates, setDates] = useState<DateSelection>({ from: new Date(), to: '' });
	const [transportType, setTransportType] = useState(TransportType.Plane);

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
		datesSheetRef.current?.open(dir);
	};

	const onFromPress = () => dateSheetOpen(Direction.From);
	const onToPress = () => dateSheetOpen(Direction.To);

	const router = useRouter();
	const nextStep = () => {
		router.push('/send/step2');
	};

	return (
		<StackScreen>
			<ScrollView>
				<Form padding="$2" gap="$6">
					<YStack gap="$4">
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
							toVal={dateTo}
							range
						/>
						<RoutesSheet ref={routesSheetRef} onSelect={onSelectRoute} routes={routes} />
						<DatesSheet ref={datesSheetRef} dates={dates} onSelect={onSelectDates} />

						<TransportGroup onChange={selectTransport} value={transportType} />
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
