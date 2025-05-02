import { ScreenScroll } from '@/components/ScreenScroll';
import { AppTitle } from '@/components/ui/AppTitle';
import { TextThemed } from '@/components/ui/TextThemed';
import { PropsWithChildren } from 'react';
import { ToggleGroup } from 'tamagui';


interface UserAdsLayoutProps extends PropsWithChildren {
	activeTab: 'active' | 'drafts';
	onChangeTab: (tab: 'active' | 'drafts') => void;
}


export const UserAdsLayout = ({ children, activeTab, onChangeTab }: UserAdsLayoutProps) => {

	return (
		<ScreenScroll
			flex={1}
		>
			<AppTitle>Мои объявления</AppTitle>
			<ToggleGroup
				type={'single'}
				disableDeactivation
				value={activeTab}
				onValueChange={onChangeTab}
			>
				<ToggleGroup.Item value={'active'}>
					<TextThemed>Active</TextThemed>
				</ToggleGroup.Item>
				<ToggleGroup.Item value={'drafts'}>
					<TextThemed>Drafts</TextThemed>
				</ToggleGroup.Item>
			</ToggleGroup>
			{children}
		</ScreenScroll>
	);
};
