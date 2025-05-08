import { useNavbar } from '@layout/Navbar';
import { ScreenView } from '@layout/ScreenView';
import { CardAdType } from '@modules/creation/card-ad-type';
import { Box, Truck } from '@tamagui/lucide-icons';
import { YStack } from 'tamagui';

export const CreateAdPage = () => {
	useNavbar({
		title: 'Создать объявление',
	});
	return (
		<ScreenView
			isModal
			withBottomSafeArea={false}
			gap={16}
			flex={1}
			px={12}
			pt={20}
		>
			<YStack
				gap={16}
				items={'center'}
				flex={1}
			>
				<CardAdType
					href={'/create/receive'}
					title='Я хочу отправить посылку'
					icon={Box}
				/>
				<CardAdType
					href={'/create/delivery'}
					title='Я могу привезти посылку'
					icon={Truck}
				/>
			</YStack>
		</ScreenView>
	);
};
