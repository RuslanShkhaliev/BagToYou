import { Direction } from '@/common';
import { DateInputTabs } from '@/components/DateInputTabs';
import { DateSelection } from '@/components/interfaces';
import { SheetWrapper } from '@/components/SheetWrapper';
import { useToggle } from '@reactuses/core';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, ListItem, ScrollView, View, YGroup } from 'tamagui';

export interface DatesSheetRef {
	open: (dir?: Direction) => void;
	close: () => void;
}
interface Props {
	dates: DateSelection;
	range?: boolean;
	onSelect?: (dates: DateSelection) => void;
}

export const DatesSheet = forwardRef<DatesSheetRef, Props>(
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
			<SheetWrapper open={isOpen} onOpenChange={setOpen}>
				{range && (
					<DateInputTabs dir={dir} fromVal={dates.from} toVal={dates.to} onChange={setDir} />
				)}
				<ScrollView>
					<YGroup backgroundColor="$bgContent">
						{Array.from({ length: 100 }, (_, i) => (
							<YGroup.Item key={i}>
								<ListItem
									backgroundColor="$bgContent"
									onPress={() => onSelect?.({ from: new Date() })}
								>
									item {i}
								</ListItem>
							</YGroup.Item>
						))}
					</YGroup>
				</ScrollView>
				<View padding={10}>
					<Button>Продолжить</Button>
				</View>
			</SheetWrapper>
		);
	},
);
