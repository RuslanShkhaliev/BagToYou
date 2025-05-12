import { ButtonStyled, FormInput, TextThemed } from '@components/ui-kit';
import { Minus, Plus } from '@tamagui/lucide-icons';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { View, XStack, YStack } from 'tamagui';
import { DeliveryStore } from '../store';

interface IncrementControlProps {
	onChange: (value: number) => void;
	value: string;
	step?: number;
	max?: number;
	min?: number;
}
const IncrementControl = ({
	onChange,
	value,
	step = 1,
	max = Infinity,
	min = 0,
}: IncrementControlProps) => {
	const [counter, setCounter] = useState(Number(value));

	useEffect(() => {
		setCounter(Number(value));
	}, [value]);
	const handleIncrement = () => {
		setCounter((counter) => {
			const nextVal = Math.min(counter + step, max);
			onChange(nextVal);
			return nextVal;
		});
	};

	const handleDecrement = () => {
		setCounter((counter) => {
			const value = Math.max(counter - step, min);
			onChange(value);
			return value;
		});
	};
	return (
		<XStack gap={10}>
			<ButtonStyled
				onPress={handleDecrement}
				variant={'outlined'}
				disabled={Number(counter) <= min}
				disabledStyle={{
					opacity: 0.5,
				}}
			>
				<Minus color={'$textPrimary'} />
			</ButtonStyled>
			<ButtonStyled
				onPress={handleIncrement}
				variant={'outlined'}
				disabled={Number(counter) >= max}
			>
				<Plus color={'$textPrimary'} />
			</ButtonStyled>
		</XStack>
	);
};

export const CustomSizes = () => {
	const { control, setValue, getValues, setFocus } =
		useFormContext<DeliveryStore>();

	useEffect(() => {
		setFocus('parcelInfo.weight');
	}, []);

	const onWeightChange = (value: number) => {
		console.log(value, 'value');
		setValue('parcelInfo.weight', value);
	};
	return (
		<View
			gap={30}
			pt={50}
			flex={1}
		>
			<View gap={20}>
				<TextThemed
					fontWeight={600}
					fontSize={18}
				>
					Parcel weight, kg
				</TextThemed>
				<XStack
					width={'100%'}
					justify={'space-between'}
				>
					<View width={200}>
						<FormInput
							required
							control={control}
							name='parcelInfo.weight'
							placeholder='0.10 kg'
							keyboardType='decimal-pad'
							type='decimal'
							autoFocus
						/>
					</View>
					<IncrementControl
						step={0.5}
						onChange={onWeightChange}
						value={getValues('parcelInfo.weight')}
					/>
				</XStack>
			</View>
			<View gap={20}>
				<TextThemed
					fontWeight={600}
					fontSize={18}
				>
					Dimensions, cm
				</TextThemed>
				<YStack gap={20}>
					<FormInput
						label={'Length'}
						required
						control={control}
						name={'parcelInfo.length'}
						type='number'
						keyboardType='decimal-pad'
					/>
					<FormInput
						label={'Width'}
						required
						control={control}
						name={'parcelInfo.width'}
						type='number'
						keyboardType='decimal-pad'
					/>
					<FormInput
						label={'Height'}
						required
						control={control}
						name={'parcelInfo.height'}
						type='number'
						keyboardType='decimal-pad'
					/>
				</YStack>
			</View>
		</View>
	);
};
