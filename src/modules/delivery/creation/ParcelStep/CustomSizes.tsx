import { FormInput, IncrementControl, TextThemed } from '@components/ui-kit';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View, XStack, YStack } from 'tamagui';
import { DeliveryStore } from '../store';
export const CustomSizes = () => {
	const { control, setFocus } = useFormContext<DeliveryStore>();

	useEffect(() => {
		setFocus('parcelInfo.weight');
	}, []);

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
					<Controller
						control={control}
						name='parcelInfo.weight'
						render={({ field }) => (
							<IncrementControl
								step={0.5}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
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
