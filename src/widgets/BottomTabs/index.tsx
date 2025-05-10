import { useLayoutInsetsContext } from '@context/layout-insets.context';
import { IconProps } from '@tamagui/helpers-icon';
import { ClipboardList, Search, Settings } from '@tamagui/lucide-icons';
import { Href } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { NamedExoticComponent } from 'react';
import { TabButton } from './TabButton';
import { TabsContainer } from './TabsContainer';

interface TabButtonItem {
	name: string;
	href: Href;
	IconComponent: NamedExoticComponent<IconProps>;
}

const tabBarButtons: TabButtonItem[] = [
	{
		href: '/',
		name: 'Search',
		IconComponent: Search,
	},
	{
		href: '/ads',
		name: 'Объявления',
		IconComponent: ClipboardList,
	},
	{
		href: '/settings',
		name: 'Settings',
		IconComponent: Settings,
	},
];
export const BottomTabsLayout = () => {
	const { setTabBarHeight } = useLayoutInsetsContext();
	return (
		<Tabs
			options={{
				backBehavior: 'firstRoute',
				initialRouteName: '/ads',
			}}
		>
			<TabSlot />
			<TabList asChild>
				<TabsContainer
					onLayout={(e) => {
						setTabBarHeight(e.nativeEvent.layout.height);
					}}
				>
					{tabBarButtons.map((tab) => (
						<TabTrigger
							key={tab.name}
							name={tab.name}
							href={tab.href}
							asChild
						>
							<TabButton IconComponent={tab.IconComponent}>
								{tab.name}
							</TabButton>
						</TabTrigger>
					))}
				</TabsContainer>
			</TabList>
		</Tabs>
	);
};
