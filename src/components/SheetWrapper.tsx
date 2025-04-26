import { X } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { Button, Sheet, SheetProps } from 'tamagui';

interface Props extends SheetProps {
	children: React.ReactNode;
	onOpenChange?: (isOpen: boolean) => void;
	onOpen?: () => void;
	onClose?: () => void;
}
export const SheetWrapper = ({ children, onOpenChange = () => {}, open, ...props }: Props) => {
	const [isOpen, setOpen] = useState<boolean>(Boolean(open));
	const [pos, setPos] = useState<number>(0);
	useEffect(() => {
		setOpen(Boolean(open));
	}, [open]);
	useEffect(() => {
		onOpenChange?.(isOpen);
	}, [isOpen]);

	return (
		<Sheet
			modal
			snapPointsMode="percent"
			snapPoints={[98]}
			disableDrag
			dismissOnSnapToBottom
			position={pos}
			onPositionChange={setPos}
			zIndex={100_000}
			open={isOpen}
			onOpenChange={setOpen}
			{...props}
		>
			<Sheet.Overlay backgroundColor="$shadow6" />
			<Sheet.Frame
				shadowOffset="2px"
				shadowColor="$white"
				paddingTop={40}
				paddingHorizontal={12}
				backgroundColor="$bgContent"
			>
				<Button
					width={28}
					height={28}
					backgroundColor="$white16"
					borderRadius="50%"
					position="absolute"
					flexShrink={0}
					padding={0}
					zIndex={1}
					top={10}
					right={10}
					alignItems="center"
					justifyContent="center"
					onPress={() => setOpen(false)}
					tabIndex={1}
				>
					<X size={16} color="$white" />
				</Button>
				{children}
			</Sheet.Frame>
		</Sheet>
	);
};
