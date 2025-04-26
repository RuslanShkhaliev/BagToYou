import { Direction, TransportType } from '@/common';
import { DatesSheetRef } from '@/components/DatesSheet';
import { DateSelection } from '@/components/interfaces';
import { RoutesSheetRef } from '@/components/RoutesSheet';
import { StackScreen } from '@/components/StackScreen';
import { useRequestCreationStore } from '@/modules/request/store';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Form, ScrollView, YStack } from 'tamagui';

export const SendStep2 = () => {
	const store = useRequestCreationStore();

	const state = useRequestCreationStore.getState();

	const [routes, setRoute] = useState<{ [Direction.From]: string; [Direction.To]: string }>({
		from: '',
		to: '',
	});
	const [routeDir, setRouteDir] = useState(Direction.From);
	const [dates, setDates] = useState<DateSelection>({ from: new Date() });
	const [dateDir, setDateDir] = useState(Direction.From);
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
					<YStack gap="$4"></YStack>
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
