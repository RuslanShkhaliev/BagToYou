import { TextStyled } from '@/components/TextStyled';
import { ThemedView } from '@/components/ThemedView';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<ThemedView style={styles.container}>
				<TextStyled type="title">This screen doesn't exist.</TextStyled>
				<Link
					href="/"
					style={styles.link}
				>
					<TextStyled type="link">Go to home screen!</TextStyled>
				</Link>
			</ThemedView>
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
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
