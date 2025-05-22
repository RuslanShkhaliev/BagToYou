import { AuthFallback } from '@components/AuthFallback';
import { FloatAction } from '@components/FloatAction';
import { LayoutScreen } from '@components/layout';
import { WithAuth } from '@components/WithAuth';
import { ModalCreateAd } from '@modals/ModalAdCreation';
import { ModalRef } from '@modals/useModalControls';
import { TabsAds } from '@modules/ads/TabsAds/TabsAds';
import { Navbar, useNavbar } from '@widgets/Navbar';
import { useRef } from 'react';

export const AdsLayout = () => {
	const modalRef = useRef<ModalRef>(null);
	const openModal = () => modalRef.current?.open();
	useNavbar({ title: 'Объявления!' });

	return (
		<LayoutScreen
			pt={30}
			navbar={<Navbar title='Объявления' />}
			tabBarSafeArea
			footer={
				<WithAuth>
					<FloatAction onPress={openModal}>
						Создать объявление
					</FloatAction>
				</WithAuth>
			}
		>
			<WithAuth
				fallback={
					<AuthFallback
						description='Войдите или зарегистрируйтесь, чтобы управлять своими
					объявлениями и размещать новые.'
					/>
				}
			>
				<TabsAds />
			</WithAuth>
			<ModalCreateAd ref={modalRef} />
		</LayoutScreen>
	);
};
