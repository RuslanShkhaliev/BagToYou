import { Location } from '@/common/schema';
import { Divider } from '@/components/ui/Divider';
import { MapPin } from '@tamagui/lucide-icons';
import React from 'react';
import { ListItem, XStack, YGroup, YStack } from 'tamagui';

export const CitiesList = ({
	cities,
	onSelect,
}: {
	cities: Location[];
	onSelect: (loc: Location) => void;
}) => {
	return (
		<YGroup
			rounded={16}
			overflow={'hidden'}
			bg={'$graphite600'}
		>
			{cities.map((item, index) => (
				<YGroup.Item key={index}>
					<ListItem
						icon={
							<MapPin
								size={18}
								color={'gray'}
							/>
						}
						onPress={() => onSelect(item)}
						justify={'flex-start'}
						maxBlockSize={120}
					>
						<YStack flex={1}>
							<ListItem.Text color={'$textPrimary'}>{item.city}</ListItem.Text>
							<ListItem.Subtitle color={'$textSecondary'}>
								{item.country}
							</ListItem.Subtitle>
						</YStack>
					</ListItem>
					{index !== cities.length - 1 && (
						<XStack pl={44}>
							<Divider />
						</XStack>
					)}
				</YGroup.Item>
			))}
		</YGroup>
	);
};
