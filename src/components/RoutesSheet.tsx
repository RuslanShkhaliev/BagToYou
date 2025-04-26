import { Direction } from '@/common';
import { SheetWrapper } from '@/components/SheetWrapper';
import { ToggleGroupItem } from '@/components/ToggleGroupItem';
import { InputSearch } from '@/components/ui/InputSearch';
import { useToggle } from '@reactuses/core';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ListItem, ScrollView, Text, ToggleGroup, YGroup, YStack } from 'tamagui';

interface RoutesState {
	[Direction.From]: string;
	[Direction.To]: string;
}
export interface RoutesSheetRef {
	open: (dir?: Direction) => void;
	close: () => void;
}
interface Props {
	onSelect?: (route: RoutesState) => void;
	routes: RoutesState;
}
export const RoutesSheet = forwardRef<RoutesSheetRef, Props>(({ onSelect, routes }: Props, ref) => {
	const [search, setSearch] = useState<string>('');
	const [direction, setDir] = useState<Direction>(Direction.From);

	const [isOpen, setOpen] = useToggle(false);

	useEffect(() => {
		console.log('routes is open', isOpen);
	}, [isOpen]);
	useEffect(() => {
		setSearch(routes[direction]);
	}, [direction]);

	useImperativeHandle(ref, () => ({
		open: (dir = Direction.From) => {
			setDir(dir);
			setOpen(true);
			console.log(isOpen);
		},
		close: () => {
			setOpen(false);
		},
	}));

	return (
		<SheetWrapper open={isOpen} onOpenChange={setOpen}>
			<YStack gap={30}>
				<ToggleGroup
					onValueChange={(val: Direction) => setDir(val)}
					type="single"
					justifyContent="center"
				>
					<ToggleGroupItem value={Direction.From}>
						<Text>Откуда</Text>
					</ToggleGroupItem>
					<ToggleGroupItem value={Direction.To}>
						<Text>Куда</Text>
					</ToggleGroupItem>
				</ToggleGroup>
				<InputSearch flexGrow={1} flexShrink={0} value={search} onChangeText={setSearch} />
				<ScrollView width="100%">
					<YGroup>
						{Array.from({ length: 100 }, (_item, i) => (
							<YGroup.Item key={i}>
								<ListItem onPress={() => onSelect?.({ [direction]: `route-${i}`, to: '' })}>
									Москва
								</ListItem>
							</YGroup.Item>
						))}
					</YGroup>
				</ScrollView>
			</YStack>
		</SheetWrapper>
	);
});
