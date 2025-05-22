import { TextThemed } from '@components/ui-kit';
import { AuthLayout } from '@modules/auth/auth.layout';
import { LoginForm } from '@modules/auth/login/login.form';
import { ROUTES } from '@shared/constants/routes';
import { Link } from 'expo-router';
import React from 'react';
import { XStack } from 'tamagui';

export const Login = () => {
	return (
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
	);
};
