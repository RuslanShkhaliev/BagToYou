import { ButtonStyled, TextThemed } from '@components/ui-kit';
import { ROUTES } from '@shared/constants/routes';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { XStack } from 'tamagui';
import { AuthLayout } from './auth.layout';
import { LoginForm } from './login/login.form';
export const LoginScreen = () => {
	return (
		<>
			<Stack.Screen
				name='login'
				options={{
					headerShown: true,
					presentation: 'modal',
					gestureEnabled: true,
					headerBackButtonDisplayMode: 'minimal',
					headerLeft: () => (
						<ButtonStyled onPress={() => router.back()}>
							<ArrowLeft color={'red'} />
						</ButtonStyled>
					),

					headerStyle: {
						backgroundColor: '$bg',
					},
					headerTitleStyle: {
						color: '$textPrimary',
					},
					headerTitle: 'Login',
				}}
			/>
			<AuthLayout
				title={'Вход в систему'}
				description={'Введите свой email и пароль'}
				footer={
					<XStack
						justify={'flex-end'}
						items='center'
						gap={6}
						flex={1}
						px={16}
					>
						<TextThemed>Нет аккаунта?</TextThemed>
						<Link
							href={ROUTES.REGISTER}
							replace
							asChild
						>
							<TextThemed textDecorationLine='underline'>
								Зарегистрироваться
							</TextThemed>
						</Link>
					</XStack>
				}
			>
				<LoginForm />
			</AuthLayout>
		</>
	);
};
