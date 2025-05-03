import { EmptyState } from '@/components/EmptyState';
import { PageTitle } from '@/components/PageTitle';
import { ScreenView } from '@/components/ScreenView';
import { TabsUnderline } from '@/components/TabsUnderline';
import { TabUnderlineItem } from '@/components/TabsUnderline/TabUnderlineItem';
import { TextThemed } from '@/components/ui/TextThemed';
import { AdsType } from '@/modules/ads/enums';
import { useUserActiveAds, useUserDraftsAds } from '@/modules/ads/service';
import { PropsWithChildren } from 'react';
import { styled, Text } from 'tamagui';

interface UserAdsLayoutProps extends PropsWithChildren {
	activeTab: AdsType;
	onChangeTab: (tab: AdsType) => void;
}

const AdsCounter = styled(Text, {
	position: 'absolute',
	t: 0,
	r: 0,
	color: '$textSecondary',
	fontSize: 10,
});

export const UserAdsLayout = ({
	children,
	activeTab,
	onChangeTab,
}: UserAdsLayoutProps) => {
	const { data: activeData = [], isFetching: isActiveFetching } =
		useUserActiveAds();
	const { data: draftsData = [], isFetching: isDraftsFetching } =
		useUserDraftsAds();

	return (
		<ScreenView
			pt={0}
			flex={1}
		>
			<PageTitle>Мои объявления</PageTitle>
			{!draftsData.length && !activeData.length ? (
				<EmptyState />
			) : (
				<TabsUnderline
					activeTab={activeTab}
					onChangeTab={onChangeTab}
				>
					<TabUnderlineItem
						value={'active'}
						position={'relative'}
					>
						<TextThemed fontSize={18}>Активные</TextThemed>
						{Boolean(activeData.length) && (
							<AdsCounter>{activeData.length}</AdsCounter>
						)}
					</TabUnderlineItem>

					<TabUnderlineItem
						value={'drafts'}
						position={'relative'}
					>
						<TextThemed fontSize={18}>Черновики</TextThemed>
						{Boolean(draftsData.length) && (
							<AdsCounter>{draftsData.length}</AdsCounter>
						)}
					</TabUnderlineItem>
				</TabsUnderline>
			)}
			{children}
		</ScreenView>
	);
};
