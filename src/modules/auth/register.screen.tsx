import { TextThemed } from '@components/ui-kit';
import { ROUTES } from '@shared/constants/routes';
import { Link } from 'expo-router';
import { XStack } from 'tamagui';
import { AuthLayout } from './auth.layout';
import { RegisterForm } from './register/register.form';
export const RegisterScreen = () => {
	return (
		<AuthLayout
			title={'Регистрация'}
			description={'Введите свой email и пароль'}
			footer={
				<XStack
					gap={10}
					flex={1}
				>
					<XStack
						justify={'flex-end'}
						items='center'
						gap={6}
						flex={1}
						px={16}
					>
						<TextThemed>Уже есть аккаунт?</TextThemed>
						<Link
							href={ROUTES.LOGIN}
							replace
							asChild
						>
							<TextThemed textDecorationLine='underline'>
								Авторизоваться
							</TextThemed>
						</Link>
					</XStack>
				</XStack>
			}
		>
			<RegisterForm />
		</AuthLayout>
	);
};
