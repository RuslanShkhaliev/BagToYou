import { ButtonLink, TextThemed } from '@components/ui-kit';
import { ScreenView } from '@layout/ScreenView';
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
			<ScreenView style={styles.container}>
				<TextThemed>This screen doesn't exist.</TextThemed>
				<ButtonLink
					href='/'
					mt={15}
				>
					<TextThemed>Go to home screen!</TextThemed>
				</ButtonLink>
			</ScreenView>
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
