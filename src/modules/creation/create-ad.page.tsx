import { TextThemed } from '@components/ui-kit';
import { useNavbar } from '@layout/Navbar';
import { ScreenView } from '@layout/ScreenView';
import { BlurView } from 'expo-blur';
import { Href, Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Card, CardBackground, XStack } from 'tamagui';

interface CardLayoutProps {
	title: React.ReactNode;
	type: 'delivery' | 'pickup';
	href: Href;
}

const CardLayout = ({ title, type, href }: CardLayoutProps) => {
	const isDelivery = type === 'delivery';
	return (
		<Link
			href={href}
			asChild
		>
			<Card
				flex={1}
				height={200}
				rounded={16}
				items={'center'}
				justify={'center'}
				bg={'transparent'}
				overflow={'hidden'}
				px={12}
			>
				<CardBackground
					transparent
					rounded={16}
					bg={isDelivery ? 'transparent' : '$blue800'}
				/>
				<BlurView
					tint={'default'}
					intensity={30}
					style={StyleSheet.absoluteFill}
				/>
				<TextThemed
					fontSize={16}
					fontWeight={700}
					color={'$textPrimary'}
					text={'center'}
				>
					{title}
				</TextThemed>
			</Card>
		</Link>
	);
};

export const CreateAdPage = () => {
	useNavbar({
		title: 'Создать объявление',
	});
	return (
		<>
			<ScreenView
				isModal
				withBottomSafeArea={false}
				gap={16}
				flex={1}
				px={12}
				justify={'center'}
			>
				<XStack gap={16}>
					<CardLayout
						href={'/create/receive'}
						title='Я хочу отправить посылку'
						type='pickup'
					/>
					<CardLayout
						href={'/create/delivery'}
						title='Я могу привезти вещи'
						type='delivery'
					/>
				</XStack>
			</ScreenView>
		</>
	);
};
