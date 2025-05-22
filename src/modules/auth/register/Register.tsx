import { TextThemed } from '@components/ui-kit';
import { ROUTES } from '@shared/constants/routes';
import { Link } from 'expo-router';
import { AuthLayout } from 'src/modules/auth/auth.layout';
import { RegisterForm } from 'src/modules/auth/register/register.form';
import { XStack } from 'tamagui';

export const Register = () => {
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
