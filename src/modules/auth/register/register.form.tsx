import { ButtonStyled, FormInput, TextThemed } from '@components/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from 'tamagui';
import { z } from 'zod';
import { useRegister } from './useRegister';

const formSchema = z
	.object({
		email: z.string({ message: 'Email is required' }).email(),
		password: z.string({ message: 'Password is required' }).min(6),
		confirmPassword: z.string({ message: 'Confirm password is required' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const RegisterForm = () => {
	const { handleSubmit, control } = useForm({
		resolver: zodResolver(formSchema),
	});

	const { register, isPending, error } = useRegister();

	const onSubmit = handleSubmit(register);

	return (
		<Form
			gap={'$4'}
			onSubmit={onSubmit}
			px={16}
		>
			<FormInput
				control={control}
				name='email'
				label={'Email'}
				placeholder='example@mail.com'
				required
			/>
			<FormInput
				control={control}
				name='password'
				label={'Password'}
				placeholder='********'
				secureTextEntry
				required
			/>
			<FormInput
				control={control}
				name='confirmPassword'
				label={'Confirm Password'}
				placeholder='********'
				secureTextEntry
				required
			/>

			{error && <TextThemed color={'$error'}>{error.message}</TextThemed>}

			<Form.Trigger
				asChild
				disabled={isPending}
			>
				<ButtonStyled variant={'inverse'}>Регистрация</ButtonStyled>
			</Form.Trigger>
		</Form>
	);
};
