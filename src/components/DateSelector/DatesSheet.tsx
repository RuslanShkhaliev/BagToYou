import { Direction } from '@/common';
import { DateInputTabs } from '@/components/DateSelector/DateInputTabs';
import { DateSelection } from '@/components/DateSelector/interfaces';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, ListItem, ScrollView, Sheet, View, YGroup } from 'tamagui';

export interface DatesSheetRef {
	open: (dir: Direction) => void;
	close: () => void;
}
interface Props {
	dates: DateSelection;
	range?: boolean;
	onSelect?: (dates: DateSelection) => void;
}
export const DatesSheet = forwardRef<DatesSheetRef, Props>(
	({ onSelect, dates, range = true }, ref) => {
		const [open, setOpen] = useState(false);
		const [dir, setDirection] = useState(Direction.From);
		const [position, setPosition] = useState<number>(0);

		useImperativeHandle(ref, () => ({
			open: (dir) => {
				setDirection(dir);
				setOpen(true);
			},
			close: () => {
				setOpen(false);
			},
		}));
		return (
			<Sheet
				forceRemoveScrollEnabled={open}
				modal
				open={open}
				onOpenChange={setOpen}
				snapPointsMode="percent"
				snapPoints={[98]}
				disableDrag
				dismissOnSnapToBottom
				position={position}
				onPositionChange={setPosition}
				zIndex={100_000}
			>
				<Sheet.Overlay backgroundColor="$shadow6" />
				<Sheet.Frame paddingTop={25} paddingHorizontal={12} gap="$3">
					{range && (
						<DateInputTabs
							dir={dir}
							fromVal={dates.from}
							toVal={dates.to}
							onChange={setDirection}
						/>
					)}
					<ScrollView>
						<YGroup>
							{Array.from({ length: 100 }, (_, i) => (
								<YGroup.Item key={i}>
									<ListItem>item {i}</ListItem>
								</YGroup.Item>
							))}
						</YGroup>
					</ScrollView>
					<View padding={10}>
						<Button>Продолжить</Button>
					</View>
				</Sheet.Frame>
			</Sheet>
		);
	},
);
