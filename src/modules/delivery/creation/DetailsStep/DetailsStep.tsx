import { ScreenLayout } from '@components/layout';
import { FormInput } from '@components/ui-kit';
import { FormTextarea } from '@components/ui-kit/inputs/FormTextarea';
import { useFormContext } from 'react-hook-form';
import { YStack } from 'tamagui';
import { DeliveryStore } from '../store';

export const DetailsStep = () => {
	const { control } = useFormContext<DeliveryStore>();

	return (
		<ScreenLayout>
			<YStack
				flex={1}
				gap={10}
			>
				<FormTextarea
					label='Описание'
					name={'description'}
					control={control}
				/>
				<FormInput
					name={'rewards'}
					keyboardType={'numeric'}
					id='input-rewards'
					control={control}
					placeholder='1000'
					label='Предложите вознаграждение'
				/>
			</YStack>
		</ScreenLayout>
	);
};
