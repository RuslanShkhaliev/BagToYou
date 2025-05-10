import { TextThemed } from '@components/ui-kit';
import { Navbar } from '@widgets/Navbar';
import React, { forwardRef } from 'react';
import { Modal, ModalProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, YStack } from 'tamagui';

interface ModalWrapperProps extends ModalProps {
	title?: React.ReactNode;
	footer?: React.ReactNode;
	children?: React.ReactNode;
	closable?: boolean;
	hideNavbar?: boolean;
	visible?: boolean;
	onClose?: () => void;
	onBack?: () => void;
}

export const ModalWrapper = forwardRef<Modal, ModalWrapperProps>(
	(
		{
			children,
			presentationStyle = 'pageSheet',
			hideNavbar,
			title,
			visible,
			onClose,
			onBack,
			...props
		},
		ref,
	) => {
		const insets = useSafeAreaInsets();
		return (
			<Modal
				ref={ref}
				animationType='slide'
				presentationStyle={presentationStyle}
				onRequestClose={onClose}
				visible={visible}
				{...props}
			>
				<YStack
					flex={1}
					bg={'$bg'}
				>
					{!hideNavbar && (
						<Navbar
							height={60}
							onClose={onClose}
							onBack={onBack}
							closable={!!onClose}
						>
							{title && <TextThemed fontSize={18}>{title}</TextThemed>}
						</Navbar>
					)}
					{children}
					{props.footer && <View px={12}>{props.footer}</View>}
					<View height={insets.bottom} />
				</YStack>
			</Modal>
		);
	},
);
