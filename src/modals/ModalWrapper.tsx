import { TextThemed } from '@components/ui-kit';
import { NavButton } from '@layout/Navbar';
import { X } from '@tamagui/lucide-icons';
import React, {
	forwardRef,
	PropsWithChildren,
	useImperativeHandle,
	useState,
} from 'react';
import { Modal, ModalProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, XStack, YStack } from 'tamagui';

export interface ModalWrapperRef {
	close: () => void;
	open: () => void;
}
interface ModalWrapperProps
	extends Pick<ModalProps, 'visible' | 'presentationStyle'> {
	title?: React.ReactNode;
	footer?: React.ReactNode;
	closable?: boolean;
	onClose?: () => void;
}
export const ModalWrapper = forwardRef<
	ModalWrapperRef,
	PropsWithChildren<ModalWrapperProps>
>(({ children, presentationStyle = 'pageSheet', onClose, ...props }, ref) => {
	const insets = useSafeAreaInsets();
	const [visible, setVisible] = useState(false);

	useImperativeHandle(ref, () => ({
		close: () => {
			setVisible(false);
		},
		open: () => {
			setVisible(true);
		},
	}));
	const handleClose = () => {
		setVisible(false);
		onClose?.();
	};
	return (
		<Modal
			animationType='slide'
			presentationStyle={presentationStyle}
			onRequestClose={handleClose}
			visible={visible}
			{...props}
		>
			<YStack
				flex={1}
				bg={'$bg'}
			>
				<XStack
					height={50}
					justify={'center'}
					items={'center'}
				>
					<TextThemed
						fontSize={16}
						fontWeight={'bold'}
					>
						{props.title}
					</TextThemed>
					<NavButton
						position={'absolute'}
						r={0}
						onPress={handleClose}
						icon={
							<X
								size={30}
								color={'$textPrimary'}
							/>
						}
					/>
				</XStack>
				{children}
				{props.footer && <View px={12}>{props.footer}</View>}
				<View height={insets.bottom} />
			</YStack>
		</Modal>
	);
});
