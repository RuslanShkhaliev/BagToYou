import { ScreenLayout } from '@components/layout';
import { FormInput } from '@components/ui-kit';
import { FormTextarea } from '@components/ui-kit/inputs/FormTextarea';
import { DeliveryState } from '@modules/delivery/store';
import { parcelInfoSchema } from '@shared/schema';
import { useFormContext } from 'react-hook-form';
import { Heading, View } from 'tamagui';
import { z } from 'zod';

const formDetailsSchema = z.object({
	parcelInfo: parcelInfoSchema,
	description: z
		.string()
		.min(1, { message: 'Пожалуйста, заполните описание' }),
	rewards: z
		.number()
		.min(1, { message: 'Пожалуйста, укажите желаемую стоимость' }),
});

export const DetailsStepPage = () => {
	const { control } = useFormContext<DeliveryState>();
	return (
		<ScreenLayout>
			<View gap={16}>
				<Heading color={'$textPrimary'}>Подробности</Heading>
				<FormInput
					control={control}
					name={'parcelInfo.height'}
					label={'Максимальная высота, см'}
				/>
				<FormInput
					control={control}
					name={'parcelInfo.length'}
					label={'Максимальная длина, см'}
				/>
				<FormInput
					control={control}
					name={'parcelInfo.width'}
					label={'Максимальная ширина, см'}
				/>
				<FormInput
					control={control}
					name={'parcelInfo.weight'}
					label={'Максимальный вес, кг'}
				/>
			</View>
			<View>
				<FormInput
					control={control}
					name={'rewards'}
					label={'Укажите желаемую стоимость услуги'}
					placeholder='$'
				/>
			</View>
			<View>
				<Heading color={'$textPrimary'}>
					Дополнительные сведения
				</Heading>
				<FormTextarea
					control={control}
					name={'parcelInfo.description'}
					placeholder={'Описание груза'}
				/>
			</View>
		</ScreenLayout>
	);
};
