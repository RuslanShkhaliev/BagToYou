import { ScreenView } from '@components/layout';
import { CardAdType } from '@modules/creation/CardAdType';
import { Box, Truck } from '@tamagui/lucide-icons';
import { useNavbar } from '@widgets/Navbar';
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
					href={'/create/delivery'}
					title='Я хочу отправить посылку'
					icon={Box}
				/>
				<CardAdType
					href={'/create/receive'}
					title='Я могу привезти посылку'
					icon={Truck}
				/>
			</YStack>
		</ScreenView>
	);
};
