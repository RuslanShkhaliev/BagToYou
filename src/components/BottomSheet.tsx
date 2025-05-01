import { TextThemed } from '@/components/ui/TextThemed';
import { useKeyboard } from '@/hooks/useKeyboard';
import { X } from '@tamagui/lucide-icons';
import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Sheet, SheetProps, XStack, YStack } from 'tamagui';


export interface BottomSheetProps extends SheetProps {
	children: React.ReactNode;
	header?: React.ReactNode;
	title?: string;
	onOpen?: () => void;
	onClose?: () => void;
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
			...props
		},
		ref,
	) => {
		const [pos, setPos] = useState<number>(0);

		useEffect(() => {
			if (!open) {
				onClose?.();
			} else {
				setPos(0);
			}
		}, [open]);

		const { keyboardHeight } = useKeyboard();
		return (
			<Sheet
				modal
				animation={'200ms'}
				snapPointsMode="percent"
				snapPoints={[95, 0]}
				position={pos}
				zIndex={100_000}
				open={open}
				dismissOnSnapToBottom={false}
				onPositionChange={(pos) => {
					setPos(pos);
					if (pos === 1) {
						onOpenChange?.(false);
					}
				}}
				onOpenChange={onOpenChange}
				forceRemoveScrollEnabled={open}
				unmountChildrenWhenHidden={unmountChildrenWhenHidden}
				{...props}
			>
				<Sheet.Overlay bg="$black40" />
				<Sheet.Handle />
				<Sheet.Frame
					rounded="$7"
					shadowColor="$black"
					shadowRadius={10}
					shadowOffset={{ height: -4, width: 0 }}
					shadowOpacity={0.2}
					pb={keyboardHeight}
					bg="$bgContent"
				>
					<YStack px={12}>
						<XStack
							justify={'center'}
							items={'center'}
							height={48}
						>
							<TextThemed>{title}</TextThemed>
							<Button
								position={'absolute'}
								width={28}
								height={28}
								bg="$white16"
								rounded="$12"
								shrink={0}
								p={0}
								r={0}
								z={1}
								items="center"
								justify="center"
								onPress={() => onOpenChange?.(false)}
								tabIndex={1}
							>
								<X
									size={16}
									color="$white"
								/>
							</Button>
						</XStack>
						{header}
					</YStack>
					<Sheet.ScrollView
						px={12}
						bounces={false}
						keyboardShouldPersistTaps={keyboardShouldPersistTaps}
					>
						{children}
					</Sheet.ScrollView>
				</Sheet.Frame>
			</Sheet>
		);
	},
);
