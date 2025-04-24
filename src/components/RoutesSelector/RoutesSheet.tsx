import { Direction } from '@/common';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Input, ListItem, ScrollView, Sheet, XGroup, YGroup } from 'tamagui';

export interface RoutesSheetRef {
	open: (dir: Direction, city?: string) => void;
	close: () => void;
}
interface Props {
	onSelect: (dir: Direction, route: string) => void;
}
interface InitialState {
	city?: string;
	dir: Direction;
}
export const RoutesSheet = forwardRef<RoutesSheetRef, Props>(({ onSelect }: Props, ref) => {
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState<number>(0);
	const [search, setSearch] = useState<string>('');
	const [dir, setDir] = useState<InitialState['dir']>(Direction.From);
	useImperativeHandle(ref, () => ({
		open: (dir: Direction, city?: string) => {
			if (city) {
				setSearch(city);
			}
			setDir(dir);
			setOpen(true);
		},
		close: () => setOpen(false),
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

			<Sheet.Frame paddingTop={25}>
				<XGroup justifyContent="center" marginBottom={20}>
					<XGroup.Item>
						<Button backgroundColor={dir === Direction.From ? '#333' : ''}>Откуда</Button>
					</XGroup.Item>
					<XGroup.Item>
						<Button backgroundColor={dir === Direction.To ? '#333' : ''}>Куда</Button>
					</XGroup.Item>
				</XGroup>
				<Input
					height="32px"
					flexGrow={1}
					flexShrink={0}
					value={search}
					onChangeText={setSearch}
					marginBottom={12}
				/>
				<ScrollView width="100%">
					<YGroup>
						{Array.from({ length: 100 }, (_item, i) => (
							<YGroup.Item key={i}>
								<ListItem onPress={() => onSelect(dir, `route-${i}`)}>Москва</ListItem>
							</YGroup.Item>
						))}
					</YGroup>
				</ScrollView>
			</Sheet.Frame>
		</Sheet>
	);
});
