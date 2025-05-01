import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tokens } from '@/styles/tokens';
import { IconProps } from '@tamagui/helpers-icon';
import { Box, Search, Send, UserCog } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React, { NamedExoticComponent } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface TabbarButton {
	routeName: string;
	title: string;
	icon: NamedExoticComponent<IconProps>;
}


const tabbarButtons: TabbarButton[] = [
	{
		routeName: 'index',
		title: 'Search',
		icon: Search,
	}, {
		routeName: 'send',
		title: 'Send',
		icon: Send,
	}, {
		routeName: 'delivery',
		title: 'Delivery',
		icon: Box,
	}, {
		routeName: 'profile',
		title: 'Profile',
		icon: UserCog,
	},
];
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
					paddingTop: 4,
					height: 60 + insets.bottom,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'transparent',
					overflow: 'hidden',
					borderTopWidth: 0,
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

				tabBarIconStyle: {
					marginBottom: 6,
				},
				tabBarLabelStyle: {
					fontSize: 9,
				},
			}}
		>
			{tabbarButtons.map((tab) => (
				<Tabs.Screen
					key={tab.routeName}
					name={tab.routeName}
					options={{
						title: tab.title,
						tabBarIcon: ({ color, size }) => (
							<tab.icon
								size={size}
								color={color}
							/>
						),
					}}
				/>
			))}
		</Tabs>
	);
}
