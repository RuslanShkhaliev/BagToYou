import {ButtonStyled, FormInput, TextThemed} from '@components/ui-kit';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Form} from 'tamagui';
import {z} from 'zod';
import {useLoginQuery} from './useLogin';

const formSchema = z.object({
	email: z
	.string({message: 'Email is required'})
	.email({message: 'Email is not valid'})
	.default('morehome3@mail.ru'),
	password: z
	.string({message: 'Password is required'})
	.min(6, {message: 'Password must be at least 6 characters'}),
});
export const LoginForm = () => {
	const {handleSubmit, control} = useForm({
		resolver: zodResolver(formSchema),
	});
	const {login, isPending, error} = useLoginQuery();

	const onSubmit = handleSubmit(login);
	return (
		<Form
			gap={'$4'}
			onSubmit={onSubmit}
			px={16}
		>
			<FormInput
				label={'Login'}
				placeholder="example@mail.com"
				required
				control={control}
				textContentType={'emailAddress'}
				autoComplete="off"
				defaultValue={'morehome3@mail.ru'}
				name="email"
			/>
			<FormInput
				control={control}
				name="password"
				label={'Password'}
				defaultValue={'123456'}
				textContentType={'password'}
				required
				placeholder="********"
				secureTextEntry
			/>

			{error && <TextThemed color={'$error'}>{error.message}</TextThemed>}

			<Form.Trigger
				asChild
				disabled={isPending}
			>
				<ButtonStyled variant={'inverse'}>Войти</ButtonStyled>
			</Form.Trigger>
		</Form>
	);
};
