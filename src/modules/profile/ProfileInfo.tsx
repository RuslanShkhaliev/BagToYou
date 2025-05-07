import { ButtonLink, ButtonStyled } from '@components/ui-kit';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Text, useTheme, View } from 'tamagui';

export const ProfileInfo = () => {
	const [open, setModalVisible] = useState(false);
	const theme = useTheme();

	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: 'Hellow',
		});
	}, [navigation]);
	return (
		<View>
			<ButtonLink href={'/profile/index'}>Назад</ButtonLink>
			<ButtonStyled onPress={() => setModalVisible(true)}>
				Открыть модалку
			</ButtonStyled>
			<Modal
				visible={open}
				animationType={'slide'}
				presentationStyle={'formSheet'}
				onRequestClose={() => setModalVisible(false)}
			>
				<Animated.View
					entering={FadeIn}
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: theme.bg.val,
					}}
				>
					{/* Dismiss modal when pressing outside */}
					<Pressable
						onPress={() => setModalVisible(false)}
						style={StyleSheet.absoluteFill}
					/>
					<Animated.View
						entering={SlideInDown}
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#eee',
						}}
					>
						<Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
							Modal Screen
						</Text>
						<ButtonLink href={'/profile'}>
							<Text>← Go back</Text>
						</ButtonLink>
					</Animated.View>
				</Animated.View>
			</Modal>
		</View>
		// <ScreenLayout
		// 	title='Профиль'
		// 	hideHeader
		// 	navBar={<PageTitle>Мой профиль</PageTitle>}
		// 	stickyAction={
		// 		<ButtonLink
		// 			ghost
		// 			justify={'flex-start'}
		// 			rounded={0}
		// 			href={'/profile/settings'}
		// 		>
		// 			Настройки профиля
		// 			<ChevronRight />
		// 		</ButtonLink>
		// 	}
		// >
		// 	<XStack>
		// 		<ListItem color={'$textPrimary'}>
		// 			<TextThemed>Имя</TextThemed>
		// 		</ListItem>
		// 	</XStack>
		// </ScreenLayout>
	);
};
