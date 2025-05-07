import { useLayoutInsetsContext } from '@/context/layout-insets.context';
import { ROUTES } from '@/shared/constants/routes';
import { IconProps } from '@tamagui/helpers-icon';
import { ClipboardList, Search, Settings } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { NamedExoticComponent } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'tamagui';
interface TabButtonItem {
	name: string;
	href: string;
	IconComponent: NamedExoticComponent<IconProps>;
}

export const unstable_settings = {
	initialRouteName: ROUTES.SEARCH,
};

const tabBarButtons: TabButtonItem[] = [
	{
		href: ROUTES.SEARCH,
		name: 'Search',
		IconComponent: Search,
	},
	{
		href: ROUTES.ADS,
		name: 'Объявления',
		IconComponent: ClipboardList,
	},
	{
		href: ROUTES.SETTINGS,
		name: 'Settings',
		IconComponent: Settings,
	},
];
export const BottomTabsLayout = () => {
	const theme = useTheme();
	const { setTabBarHeight } = useLayoutInsetsContext();
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 1000,
					backgroundColor: 'transparent',
					borderTopWidth: 0,
				},
				tabBarLabelStyle: {
					color: theme.textSecondary.val,
				},
				tabBarActiveTintColor: 'white',
				tabBarBackground: () => (
					<BlurView
						style={StyleSheet.absoluteFill}
						intensity={80}
						tint='dark'
					/>
				),
			}}
		>
			{tabBarButtons.map((tabButton) => (
				<Tabs.Screen
					name={tabButton.href}
					options={{
						title: tabButton.name,
						tabBarLabel: tabButton.name,
						tabBarIcon: ({ color, size }) => (
							<tabButton.IconComponent
								size={size}
								color={color}
							/>
						),
					}}
					key={tabButton.name}
				/>
			))}
		</Tabs>
	);
};
