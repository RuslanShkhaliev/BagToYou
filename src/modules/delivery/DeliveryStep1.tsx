import { Direction } from '@/common';
import { DateControl } from '@/components/DateControl';
import { DatesSheet, DatesSheetRef } from '@/components/DatesSheet';
import { DateSelection } from '@/components/interfaces';
import { PageWrapper } from '@/components/PageWrapper';
import { RoutesInputGroup } from '@/components/RoutesInputGroup';
import { RoutesSheet, RoutesSheetRef } from '@/components/RoutesSheet';
import { DeliveryRoute, useDeliveryStore } from '@/modules/delivery/store';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Button, Form, YStack } from 'tamagui';

export const DeliveryStep1 = () => {
	const store = useDeliveryStore();

	const [routes, setRoute] = useState<DeliveryRoute>(store.route);
	const [date, setDates] = useState<Date>(store.date);

	const routesSheetRef = useRef<RoutesSheetRef>(null);

	const routeSelect = (dir: Direction) => {
		routesSheetRef.current?.open(dir);
	};
	const onRouteFromSelect = () => routeSelect(Direction.From);
	const onRouteToSelect = () => routeSelect(Direction.To);

	const onSelectRoute = useCallback((route: DeliveryRoute) => {
		setRoute((state) => ({ ...state, ...route }));
	}, []);

	const onSelectDates = (dates: DateSelection) => {
		setDates((state) => ({ ...state, ...dates }));
	};

	const datesSheetRef = useRef<DatesSheetRef>(null);
	const dateSheetOpen = (dir: Direction) => {
		console.log('dateSheetOpen', datesSheetRef.current);
		datesSheetRef.current?.open(dir);
	};

	const onFromPress = () => dateSheetOpen(Direction.From);
	const router = useRouter();
	const nextStep = () => {
		router.push('/deliver/step2');
	};

	return (
		<PageWrapper paddingTop={10}>
			<Form gap="$6">
				<YStack gap="$4">
					<RoutesInputGroup
						to={routes.to}
						from={routes.from}
						onFromSelect={onRouteFromSelect}
						onToSelect={onRouteToSelect}
					/>
					<DateControl onPress={onFromPress} value={date} placeholder="Дата доставки" />
					<RoutesSheet ref={routesSheetRef} onSelect={onSelectRoute} routes={routes} />
					<DatesSheet
						ref={datesSheetRef}
						dates={{ from: date, to: date }}
						onSelect={onSelectDates}
					/>
				</YStack>
				<Form.Trigger asChild>
					<Button size="$5" fontSize="18px" onPress={nextStep}>
						Продолжить
					</Button>
				</Form.Trigger>
			</Form>
		</PageWrapper>
	);
};
