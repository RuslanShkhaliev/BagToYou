import { ScreenScroll } from '@/components/ScreenScroll';
import { TransportGroup } from '@/components/TransportGroup';
import { ButtonStyled } from '@/components/ui/buttons/ButtonStyled';
import { LabelStyled } from '@/components/ui/LabelStyled';
import { DateSelection } from '@/shared/interface';
import { Location } from '@/shared/schema';
import { DatePicker } from '@/widgets/DatesPicker/DatePicker';
import { RoutePicker } from '@/widgets/RoutePicker/RoutePicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TransportType } from 'src/shared';
import { Form, YStack } from 'tamagui';

export const SendStep1 = () => {
	const [route, setRoute] = useState<{
		from: Location | null;
		to: Location | null;
	}>({
		from: null,
		to: null,
	});
	const [dates, setDates] = useState<{
		from: string | Date;
		to: string | Date;
	}>({
		from: new Date(),
		to: '',
	});
	const [transportType, setTransportType] = useState(TransportType.Plane);

	const selectTransport = (val: TransportType) => {
		setTransportType(() => val);
	};
	const onSelectDates = (dates: DateSelection) => {
		setDates((state) => ({ ...state, ...dates }));
	};

	const router = useRouter();
	const nextStep = () => {
		router.push('/send/step2');
	};

	return (
		<ScreenScroll>
			<Form gap='$6'>
				<YStack gap='$4'>
					<RoutePicker
						value={route}
						onChange={setRoute}
					/>
					<DatePicker
						fields={[
							{
								value: new Date(),
								placeholder: 'Дата отбытия',
							},
							{
								value: '',
								placeholder: 'Дата прибытия',
							},
						]}
					/>

					<YStack>
						<LabelStyled>Choose transport type</LabelStyled>
						<TransportGroup
							onChange={selectTransport}
							value={transportType}
						/>
					</YStack>
				</YStack>
				<Form.Trigger asChild>
					<ButtonStyled
						outlined
						size='$5'
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
