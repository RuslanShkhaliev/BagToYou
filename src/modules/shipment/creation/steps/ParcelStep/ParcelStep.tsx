import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import { ButtonStyled } from '@components/ui-kit';
import { useNavbar } from '@widgets/Navbar';
import React from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'tamagui';
import { CustomSizes } from './components/CustomSizes';
import { PresetsList } from './components/PresetList';
import { useFormParcelStep } from './hooks';

export const ParcelStep = () => {
	const { handleSubmit } = useFormParcelStep();

	useNavbar({
		title: 'Шаг 2: Посылка',
		right: (
			<ButtonStyled
				onPress={() => console.log('save')}
				variant={'ghost'}
			>
				Сохранить и выйти
			</ButtonStyled>
		),
	});

	const renderScene = SceneMap({
		presets: PresetsList,
		custom: CustomSizes,
	});

	const routes = [
		{ key: 'presets', title: 'Приблизительно' },
		{ key: 'custom', title: 'Точно' },
	];

	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);

	return (
		<ScreenLayout
			flex={1}
			footer={
				<FloatAction>
					<ButtonStyled onPress={handleSubmit}>Далее</ButtonStyled>
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
