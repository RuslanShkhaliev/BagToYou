import { ButtonLink } from '@/components/ui/buttons/ButtonLink';
import { TextThemed } from '@/components/ui/TextThemed';
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
					<ButtonLink
						replace
						href={'/login'}
					>
						Уже есть аккаунт?
						<TextThemed textDecorationLine='underline'>Войти</TextThemed>
					</ButtonLink>
				</XStack>
			}
		>
			<RegisterForm />
		</AuthLayout>
	);
};
