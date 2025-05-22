import { LocationSchema } from '@shared/schemas';
import { MapPin } from '@tamagui/lucide-icons';
import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { ListItem, YStack } from 'tamagui';

interface LocationsListProps
	extends Omit<FlatListProps<LocationSchema>, 'renderItem'> {
	onSelect: (loc: LocationSchema) => void;
}

export const LocationsList = ({ onSelect, ...props }: LocationsListProps) => {
	return (
		<FlatList
			{...props}
			automaticallyAdjustKeyboardInsets
			automaticallyAdjustContentInsets
			automaticallyAdjustsScrollIndicatorInsets
			bounces={false}
			renderItem={({ item }) => (
				<ListItem
					icon={
						<MapPin
							size={18}
							color={'gray'}
						/>
					}
					onPress={() => onSelect(item)}
					justify={'flex-start'}
				>
					<YStack flex={1}>
						<ListItem.Text color={'$textPrimary'}>
							{item.city}
						</ListItem.Text>
						<ListItem.Subtitle color={'$textSecondary'}>
							{item.country}
						</ListItem.Subtitle>
					</YStack>
				</ListItem>
			)}
			contentContainerStyle={{
				backgroundColor: '$graphite600',
				borderRadius: 16,
			}}
		/>
	);
};
