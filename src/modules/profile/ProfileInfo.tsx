import { ScreenLayout } from '@components/layout/ScreenLayout';
import { ButtonLink, ButtonStyled } from '@components/ui-kit';
import { ModalWrapper } from '@modals/ModalWrapper';
import { useNavbar } from '@widgets/Navbar';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Text, useTheme } from 'tamagui';

export const ProfileInfo = () => {
	const [open, setModalVisible] = useState(false);
	const theme = useTheme();

	useNavbar({
		title: 'Мой профиль',
	});
	return (
		<ScreenLayout>
			<ButtonStyled onPress={() => setModalVisible(true)}>
				Открыть модалку
			</ButtonStyled>
			<ModalWrapper
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
			</ModalWrapper>
		</ScreenLayout>
	);
};
