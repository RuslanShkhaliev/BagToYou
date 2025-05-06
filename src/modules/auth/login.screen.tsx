import { ButtonLink } from '@/components/ui/buttons/ButtonLink';
import { TextThemed } from '@/components/ui/TextThemed';
import React from 'react';
import { AuthLayout } from './auth.layout';
import { LoginForm } from './login/login.form';

export const LoginScreen = () => {
	return (
		<AuthLayout
			title={'Вход в систему'}
			description={'Введите свой email и пароль'}
			footer={
				<ButtonLink
					variant='ghost'
					replace
					href={{
						pathname: '/register',
					}}
					items='center'
				>
					Нет аккаунта?{' '}
					<TextThemed textDecorationLine='underline'>
						Зарегистрироваться
					</TextThemed>
				</ButtonLink>
			}
		>
			<LoginForm />
		</AuthLayout>
	);
};
