import { ButtonLink, PageTitle } from '@components/ui-kit';
import { ScreenLayout } from '@layout/ScreenLayout';
import { IconProps } from '@tamagui/helpers-icon';
import { Box, Truck } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { NamedExoticComponent } from 'react';
import { ScrollView } from 'tamagui';
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
	return (
		<ScreenLayout
			bodyProps={{
				px: 0,
			}}
			hideHeader
			navBar={
				<PageTitle
					fontSize={26}
					text={'left'}
					px={12}
					bg={'$bg'}
				>
					Новое объявление
				</PageTitle>
			}
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
