import { DateSelection } from '@/common/interface';
import { ScreenScroll } from '@/components/ScreenScroll';
import { ButtonStyled } from '@/components/ui/ButtonStyled';
import { DeliveryRoute, useDeliveryStore } from '@/modules/delivery/store';
import { DatePicker } from '@/widgets/DatesPicker';
import { RoutePicker } from '@/widgets/RoutePicker/RoutePicker';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Form, YStack } from 'tamagui';

export const DeliveryStep1 = () => {
	const store = useDeliveryStore();

	const [route, setRoute] = useState<DeliveryRoute>(store.step1.route);
	const [date, setDates] = useState<Date>(store.step1.date);
	const onPickRoute = (route: DeliveryRoute) => {
		console.log({ route }, 'onPickRoute');
		setRoute((prev) => route);
	};

	const onSelectRoute = useCallback((route: DeliveryRoute) => {
		setRoute((state) => ({ ...state, ...route }));
	}, []);

	const onSelectDates = (dates: DateSelection) => {
		setDates((state) => ({ ...state, ...dates }));
	};
	const router = useRouter();
	const nextStep = () => {
		router.push('/delivery/step2');
	};

	return (
		<ScreenScroll pt={10}>
			<Form gap="$6">
				<YStack gap="$4">
					<RoutePicker
						onPick={onPickRoute}
						value={route}
					/>
					<DatePicker
						dates={[date]}
					/>
				</YStack>
				<Form.Trigger asChild>
					<ButtonStyled
						size="$5"
						primary
						fontSize={18}
						onPress={nextStep}
					>
						Продолжить
					</ButtonStyled>
				</Form.Trigger>
			</Form>
		</ScreenScroll>
	);
};
