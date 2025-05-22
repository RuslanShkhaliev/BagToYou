import { ModalWrapper } from '@modals/ModalWrapper';
import { ModalRef, useModalControls } from '@modals/useModalControls';
import { ROUTES_DELIVERY } from '@modules/delivery/routes';
import { ROUTES_SHIPMENT } from '@modules/shipment/routes';
import { Box, Truck } from '@tamagui/lucide-icons';
import { Href, useRouter } from 'expo-router';
import { forwardRef, useImperativeHandle } from 'react';
import { YStack } from 'tamagui';
import { CardAdType } from './CardAdType';

interface ModalCreateAdProps {
	open?: boolean;
}

export const ModalCreateAd = forwardRef<ModalRef, ModalCreateAdProps>(
	({ open }, ref) => {
		const modal = useModalControls(open);

		useImperativeHandle(ref, () => ({
			open: modal.open,
			close: modal.close,
		}));
		const router = useRouter();

		const onSelect = (href: Href) => {
			router.push(href);
			modal.close();
		};

		return (
			<ModalWrapper
				visible={modal.visible}
				onClose={modal.close}
			>
				<YStack
					px={12}
					gap={16}
					items={'center'}
					flex={1}
				>
					<CardAdType
						title='Я хочу отправить посылку'
						icon={Box}
						onPress={() => {
							onSelect(ROUTES_SHIPMENT.CREATE.NAME);
						}}
					/>
					<CardAdType
						onPress={() => {
							onSelect(ROUTES_DELIVERY.CREATE.NAME);
						}}
						title='Я могу привезти посылку'
						icon={Truck}
					/>
				</YStack>
			</ModalWrapper>
		);
	},
);
