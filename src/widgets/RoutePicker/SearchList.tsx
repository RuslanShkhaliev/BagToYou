import { Location } from '@/common/schema';
import { Divider } from '@/components/ui/Divider';
import { locations } from '@/mock/dbMock';
import { MapPin } from '@tamagui/lucide-icons';
import React, { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListItem, YGroup, YStack } from 'tamagui';

const filterCities = (text: string, list: Location[]): Location[] => {
	if (!text) {
		return [];
	}

	return list.filter((item) =>
		item.city.toLowerCase().startsWith(text.toLowerCase()),
	);
};

interface SearchListProps {
	initialValue?: string;
	onSelect?: (location: Location) => void;
}

export const SearchList = ({ initialValue, onSelect }: SearchListProps) => {
	const insets = useSafeAreaInsets();
	const [search, setSearch] = useState<string>(initialValue ?? '');

	const filteredList = useMemo(() => filterCities(search, locations), [search]);

	const onSelectRoute = (location: Location) => {
		setSearch(location.city);
		onSelect?.(location);
	};

	return (
		<YGroup
			pt={20}
			rounded={16}
		>
			{filteredList.map((item, index) => (
				<YGroup.Item key={index}>
					<ListItem
						icon={MapPin}
						onPress={() => onSelectRoute(item)}
						bg={'$graphite600'}
						color={'$graphite300'}
						justify={'flex-start'}
					>
						<YStack>
							<ListItem.Text color={'$textPrimary'}>{item.city}</ListItem.Text>
							<ListItem.Subtitle color={'$textSecondary'}>
								{item.country}
							</ListItem.Subtitle>
						</YStack>
					</ListItem>
					<Divider />
				</YGroup.Item>
			))}
		</YGroup>
	);
};
