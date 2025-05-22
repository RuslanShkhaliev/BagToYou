import { useKeyboard } from '@hooks/useKeyboard';
import { X } from '@tamagui/lucide-icons';
import React, { forwardRef, useState } from 'react';
import {
	Button,
	Heading,
	Sheet,
	SheetProps,
	View,
	XStack,
	YStack,
} from 'tamagui';

export interface BottomSheetProps extends SheetProps {
	children: React.ReactNode;
	header?: React.ReactNode;
	title?: React.ReactNode;
	onOpen?: () => void;
	onClose?: () => void;
	scroll?: boolean;
	closable?: boolean;
	toggleOpen?: (open: boolean) => void;
	keyboardShouldPersistTaps?: 'always' | 'handled' | 'never' | boolean;
}

export interface BottomSheetRef {
	open: () => void;
	close: () => void;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
	(
		{
			children,
			header,
			open,
			title,
			onOpenChange,
			onClose,
			closable = true,
			unmountChildrenWhenHidden = true,
			keyboardShouldPersistTaps = 'handled',
			scroll = true,
			modal = true,
			snapPoints = [95, 0],
			snapPointsMode = 'percent',
			...props
		},
		ref,
	) => {
		const [pos, setPos] = useState<number>(0);

		const { keyboardHeight } = useKeyboard();
		return (
			<Sheet
				modal={modal}
				animation={'200ms'}
				snapPointsMode={snapPointsMode}
				snapPoints={snapPoints}
				position={pos}
				zIndex={100_000}
				open={open}
				moveOnKeyboardChange
				onPositionChange={setPos}
				dismissOnSnapToBottom
				onOpenChange={onOpenChange}
				forceRemoveScrollEnabled={open}
				unmountChildrenWhenHidden={unmountChildrenWhenHidden}
				{...props}
			>
				<Sheet.Overlay bg='$black40' />
				<Sheet.Frame
					borderTopEndRadius={24}
					borderTopStartRadius={24}
					pb={keyboardHeight}
					pt={16}
					bg='$bg'
					flex={1}
					adjustPaddingForOffscreenContent
				>
					<Sheet.Handle
						position='absolute'
						top={0}
						height={4}
						width={40}
						bg='$graphite600'
						self='center'
						rounded={2}
						my={8}
					/>
					{header}
					<YStack px={12}>
						<XStack
							justify={'center'}
							items={'center'}
							height={48}
						>
							<Heading>{title}</Heading>
							{closable && (
								<Button
									position={'absolute'}
									width={28}
									height={28}
									bg='$white16'
									rounded='$12'
									shrink={0}
									p={0}
									r={0}
									z={1}
									items='center'
									justify='center'
									onPress={() => onOpenChange?.(false)}
									tabIndex={1}
								>
									<X
										size={16}
										color='$white'
									/>
								</Button>
							)}
						</XStack>
					</YStack>
					{scroll ? (
						<Sheet.ScrollView
							px={12}
							bounces={false}
							automaticallyAdjustKeyboardInsets
							automaticallyAdjustContentInsets
							keyboardShouldPersistTaps={
								keyboardShouldPersistTaps
							}
						>
							{children}
						</Sheet.ScrollView>
					) : (
						<View
							px={12}
							flex={1}
						>
							{children}
						</View>
					)}
				</Sheet.Frame>
			</Sheet>
		);
	},
);
