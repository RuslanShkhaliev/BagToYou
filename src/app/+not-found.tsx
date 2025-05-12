import { ScreenLayout } from '@components/layout';
import { ButtonLink, TextThemed } from '@components/ui-kit';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Oops!',
				}}
			/>
			<ScreenLayout style={styles.container}>
				<TextThemed>This screen doesn't exist.</TextThemed>
				<ButtonLink
					href='/'
					mt={15}
				>
					<TextThemed>Go to home screen!</TextThemed>
				</ButtonLink>
			</ScreenLayout>
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
