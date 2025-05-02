import { Direction } from '@/common';
import { DateSelection } from '@/common/interface';
import { BottomSheet } from '@/components/BottomSheet';
import { ButtonStyled } from '@/components/ui/ButtonStyled';
import { useToggle } from '@/hooks/useToggle';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'tamagui';

export interface DatesSheetRef {
	open: (dir?: Direction) => void;
	close: () => void;
}

interface Props {
	dates: DateSelection;
	range?: boolean;
	onSelect?: (dates: DateSelection) => void;
}

export const SheetDates = forwardRef<DatesSheetRef, Props>(
	({ onSelect, dates, range = true }, ref) => {
		const [dir, setDir] = useState<Direction>(Direction.From);
		const [isOpen, setOpen] = useToggle(false);
		useImperativeHandle(ref, () => ({
			open: (dir = Direction.From) => {
				setDir(dir);
				setOpen(true);
			},
			close: () => {
				setOpen(false);
			},
		}));
		return (
			<BottomSheet
				open={isOpen}
				onOpenChange={setOpen}
			>
				<View p={10}>
					<ButtonStyled>Продолжить</ButtonStyled>
				</View>
			</BottomSheet>
		);
	},
);
