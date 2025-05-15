import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { parcelInfoSchema } from '@shared/schema';
import { useNavbar } from '@widgets/Navbar';
import { useRouter } from 'expo-router';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'tamagui';
import { parseErrors } from '../shared/utils';
import { DeliveryStore, useDeliveryStore } from '../store';
import { CustomSizes } from './CustomSizes';
import { PresetsList } from './PresetList/PresetsList';

export const ParcelStepPage = () => {
	const router = useRouter();
	const { updateState } = useDeliveryStore();
	const { handleSubmit, setError } = useFormContext<DeliveryStore>();

	useNavbar({
		right: (
			<ButtonStyled
				onPress={() => console.log('save')}
				variant={'ghost'}
			>
				Сохранить и выйти
			</ButtonStyled>
		),
	});

	const onSubmit = (formData: DeliveryStore) => {
		const { success, data, error } = parcelInfoSchema.safeParse(
			formData.parcelInfo,
		);
		if (!success) {
			const errors = parseErrors(error?.format());
			console.log(errors);

			errors.forEach(([key, value]) => {
				setError(`parcelInfo.${key}` as never, { message: value });
			});

			return;
		}
		updateState({
			parcelInfo: data,
		});
		router.push('/delivery/create/details');
	};

	const renderScene = SceneMap({
		presets: PresetsList,
		custom: CustomSizes,
	});

	const routes = [
		{ key: 'presets', title: 'Approximate' },
		{ key: 'custom', title: 'Precise' },
	];

	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);

	return (
		<ScreenLayout
			flex={1}
			footer={
				<FloatAction>
					<ButtonStyled onPress={handleSubmit(onSubmit)}>
						Далее
					</ButtonStyled>
				</FloatAction>
			}
		>
			<TabView
				style={{ flex: 1 }}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
		</ScreenLayout>
	);
};
