import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tokens } from '@/styles/tokens';
import { Box, Search, Send, UserCog } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: {
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					height: 38,
					backgroundColor: 'transparent', // обязательно прозрачный для BlurView
					overflow: 'hidden', // чтобы блюр обрезался
					borderTopWidth: 0,
				},
				tabBarBackground: () => (
					<BlurView
						intensity={80}
						tint={colorScheme === 'dark' ? 'dark' : 'light'}
						style={{ flex: 1, backgroundColor: tokens.color.white.val }}
					/>
				),
				tabBarActiveTintColor: tokens.color.white.val,
				tabBarInactiveTintColor: tokens.color.graphite300.val,

				tabBarLabelStyle: {
					fontSize: 12,
					paddingVertical: 4,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'search',
					tabBarIcon: ({ color }) => <Search size={12} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="send"
				options={{
					title: 'send',
					tabBarIcon: ({ color }) => <Send size={12} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="deliver"
				options={{
					title: 'deliver',
					tabBarIcon: ({ color }) => <Box size={12} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'profile',
					tabBarIcon: ({ color }) => <UserCog size={12} color={color} />,
				}}
			/>
		</Tabs>
	);
}
