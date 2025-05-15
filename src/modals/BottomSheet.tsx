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
				onOpenChange={onOpenChange}
				forceRemoveScrollEnabled={open}
				unmountChildrenWhenHidden={unmountChildrenWhenHidden}
				{...props}
			>
				<Sheet.Overlay bg='$black40' />
				<Sheet.Handle />
				<Sheet.Frame
					rounded='$7'
					pb={keyboardHeight}
					bg='$bg'
					flex={1}
					adjustPaddingForOffscreenContent
				>
					<YStack px={12}>
						<XStack
							justify={'center'}
							items={'center'}
							height={48}
						>
							<Heading>{title}</Heading>
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
						</XStack>
						{header}
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
