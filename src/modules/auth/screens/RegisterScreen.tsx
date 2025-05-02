import { register } from '@/services/auth';
import { useState } from 'react';
import { YStack, Text, Input, Button } from 'tamagui';

export const RegisterScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async () => {
		try {
			await register(email, password);
		} catch (error) {
			console.error('Ошибка входа:', error);
		}
	};
	return (
		<YStack>
			<Text>Registration</Text>
			<Input
				placeholder='Email'
				value={email}
				onChangeText={setEmail}
			/>
			<Input
				placeholder='Password'
				value={password}
				secureTextEntry
				onChangeText={setPassword}
			/>
			<Button onPress={handleRegister}>Войти</Button>
		</YStack>
	);
};
