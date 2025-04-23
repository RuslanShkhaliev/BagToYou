import { login } from '@/services/auth';
import { useState } from 'react';
import { TextInput, View, Text, Button } from 'react-native';

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			await login(email, password);
		} catch (error) {
			console.error('Ошибка входа:', error);
		}
	};
	return (
		<View>
			<Text>Login</Text>
			<TextInput placeholder="Email" value={email} onChangeText={setEmail} />
			<TextInput
				placeholder="Password"
				value={password}
				secureTextEntry
				onChangeText={setPassword}
			/>
			<Button title="Войти" onPress={handleLogin} />
		</View>
	);
};
