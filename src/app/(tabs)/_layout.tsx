import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tokens } from '@/styles/tokens';
import { Box, Search, Send, UserCog } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
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
					height: 60 + insets.bottom,
					backgroundColor: 'transparent',
					overflow: 'hidden',
					borderTopWidth: 0,
					paddingTop: 4,
					paddingBottom: insets.bottom,
				},
				tabBarBackground: () => (
					<BlurView
						intensity={90}
						tint={colorScheme === 'dark' ? 'dark' : 'light'}
						style={{ flex: 1 }}
					/>
				),
				tabBarActiveTintColor: tokens.color.white.val,
				tabBarInactiveTintColor: tokens.color.graphite300.val,

				tabBarLabelStyle: {
					fontSize: 12,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'search',
					tabBarIcon: ({ color }) => <Search size="$1" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="send"
				options={{
					title: 'send',
					tabBarIcon: ({ color }) => <Send size="$1" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="deliver"
				options={{
					title: 'deliver',
					tabBarIcon: ({ color }) => <Box size="$1" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'profile',
					tabBarIcon: ({ color }) => <UserCog size="$1" color={color} />,
				}}
			/>
		</Tabs>
	);
}
