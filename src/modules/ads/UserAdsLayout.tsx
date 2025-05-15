import { EmptyState } from '@components/EmptyState';
import { FloatAction } from '@components/FloatAction';
import { ScreenLayout } from '@components/layout';
import {
	ButtonStyled,
	TabsUnderline,
	TabUnderlineItem,
	TextThemed,
} from '@components/ui-kit';
import { ModalCreateAd } from '@modules/ads/ModalAdCreation';
import { ModalRef } from '@modules/ads/ModalAdCreation/hooks/useModalControls';
import { useActiveAdsQuery } from '@modules/ads/active/query';
import { useDraftsAdsQuery } from '@modules/ads/drafts/query';
import { Navbar, useNavbar } from '@widgets/Navbar';
import { PropsWithChildren, useRef } from 'react';
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
	const modalRef = useRef<ModalRef>(null);
	const openModal = () => modalRef.current?.open();

	const { data: activeData = [] } = useActiveAdsQuery();
	const { data: draftsData = [] } = useDraftsAdsQuery();

	useNavbar({ title: 'Объявления' });

	return (
		<ScreenLayout
			pt={30}
			navbar={<Navbar title='Объявления' />}
			tabBarSafeArea
			footer={
				<FloatAction>
					<ButtonStyled onPress={openModal}>Создать объявление</ButtonStyled>
				</FloatAction>
			}
		>
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
			<ModalCreateAd ref={modalRef} />
		</ScreenLayout>
	);
};
