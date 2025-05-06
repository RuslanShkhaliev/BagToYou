import { ButtonLink } from '@/components/ui/buttons/ButtonLink';
import { TextThemed } from '@/components/ui/TextThemed';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { View } from 'tamagui';

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View style={styles.container}>
				<TextThemed>This screen doesn't exist.</TextThemed>
				<ButtonLink
					href='/'
					mt={15}
				>
					<TextThemed>Go to home screen!</TextThemed>
				</ButtonLink>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
});
