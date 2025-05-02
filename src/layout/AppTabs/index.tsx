import { TabButton } from '@/layout/AppTabs/TabButton';
import { TabsContainer } from '@/layout/AppTabs/TabsContainer';
import { IconProps } from '@tamagui/helpers-icon';
import { ClipboardList, Search, UserCog } from '@tamagui/lucide-icons';
import { Href } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { NamedExoticComponent } from 'react';

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
		href: '/profile',
		name: 'Profile',
		IconComponent: UserCog,
	},
];
export const AppTabs = () => {
	return (
		<Tabs>
			<TabSlot />
			<TabList asChild>
				<TabsContainer>
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
