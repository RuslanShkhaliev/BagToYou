import { useLayoutInsetsContext } from '@/context/layout-insets.context';
import { ROUTES } from '@/shared/constants/routes';
import { HapticTab } from '@components/HapticTab';
import { IconProps } from '@tamagui/helpers-icon';
import { ClipboardList, Search, User } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { NamedExoticComponent, PropsWithChildren } from 'react';
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
		name: 'Ads',
		IconComponent: ClipboardList,
	},
	{
		href: ROUTES.SETTINGS,
		name: 'Profile',
		IconComponent: User,
	},
];

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		backgroundColor: 'transparent',
		borderTopWidth: 0,
	},
});
export const BottomTabsLayout = ({ children }: PropsWithChildren) => {
	const theme = useTheme();
	const { setTabBarHeight } = useLayoutInsetsContext();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				headerStyle: {
					backgroundColor: theme.bg.val,
				},
				tabBarStyle: styles.tabBar,
				tabBarButton: HapticTab,
				tabBarLabelStyle: {
					color: theme.textSecondary.val,
				},
				tabBarInactiveTintColor: theme.textSecondary.val,
				tabBarActiveTintColor: theme.accent.val,
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
					key={tabButton.name}
					name={tabButton.href}
					options={{
						tabBarActiveTintColor: theme.btnAccentBgHover.val,
						tabBarIcon: ({ color, size }) => (
							<tabButton.IconComponent
								size={size}
								color={color}
							/>
						),
					}}
				/>
			))}
		</Tabs>
	);
};
