import { EmptyState } from '@components/EmptyState';
import { FloatAction } from '@components/FloatAction';
import { ScreenView } from '@components/layout';
import {
	ButtonLink,
	TabsUnderline,
	TabUnderlineItem,
	TextThemed,
} from '@components/ui-kit';
import { useActiveAdsQuery } from '@modules/userAds/active/query';
import { useDraftsAdsQuery } from '@modules/userAds/drafts/query';
import { PropsWithChildren } from 'react';
import { styled, Text } from 'tamagui';
import { AdsType } from './enums';

interface UserAdsLayoutProps extends PropsWithChildren {
	activeTab: AdsType;
	onChangeTab: (tab: AdsType) => void;
}

const AdsCounter = styled(Text, {
	position: 'absolute',
	t: 5,
	r: -5,
	color: '$textSecondary',
	fontSize: 10,
});

export const UserAdsLayout = ({
	children,
	activeTab,
	onChangeTab,
}: UserAdsLayoutProps) => {
	const { data: activeData = [], isFetching: isActiveFetching } =
		useActiveAdsQuery();
	const { data: draftsData = [], isFetching: isDraftsFetching } =
		useDraftsAdsQuery();

	return (
		<ScreenView>
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
						position={'relative'}
						value={'drafts'}
					>
						<TextThemed fontSize={18}>Черновики</TextThemed>
						{Boolean(draftsData.length) && (
							<AdsCounter>{draftsData.length}</AdsCounter>
						)}
					</TabUnderlineItem>
				</TabsUnderline>
			)}
			{children}
			<FloatAction bg={'transparent'}>
				<ButtonLink href={'/create'}>Создать объявление</ButtonLink>
			</FloatAction>
		</ScreenView>
	);
};
