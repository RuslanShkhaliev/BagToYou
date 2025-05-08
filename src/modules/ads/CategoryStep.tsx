import { ButtonLink } from '@components/ui-kit';
import { ScreenLayout } from '@layout/ScreenLayout';
import { IconProps } from '@tamagui/helpers-icon';
import { Box, Truck } from '@tamagui/lucide-icons';
import { useNavigation, useRouter } from 'expo-router';
import { NamedExoticComponent, useEffect } from 'react';
import { ScrollView, useTheme } from 'tamagui';
import { CategoryType } from './flow';

export interface CategoryItem {
	type: CategoryType;
	title: string;
	Icon: NamedExoticComponent<IconProps>;
}

export const categoriesList: CategoryItem[] = [
	{
		type: CategoryType.delivery,
		title: 'Доставка вещей',
		Icon: Truck,
	},
	{
		type: CategoryType.receive,
		title: 'Запрос на доставку вещей',
		Icon: Box,
	},
];

export const CategoryStep = () => {
	const router = useRouter();

	const navigation = useNavigation();

	const theme = useTheme();
	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: 'Create ad',
			headerBackButtonDisplayMode: 'minimal',
			headerTitleStyle: {
				color: theme.textPrimary.val,
			},
			headerStyle: {
				backgroundColor: theme.bg.val,
			},
		});
	}, [navigation]);
	return (
		<ScreenLayout
			bodyProps={{
				px: 0,
			}}
			onClose={() => router.replace('/ads')}
		>
			<ScrollView
				flex={1}
				pt={50}
			>
				{categoriesList.map((category, index) => (
					<ButtonLink
						key={index}
						ghost
						href={`/add/${category.type}`}
						textProps={{
							fontSize: 17,
						}}
						justify={'flex-start'}
						icon={
							<category.Icon
								size={26}
								color={'$textPrimary'}
							/>
						}
					>
						{category.title}
					</ButtonLink>
				))}
			</ScrollView>
		</ScreenLayout>
	);
};
