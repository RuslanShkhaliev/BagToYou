import { LabelStyled } from '@components/ui-kit';

import { InputField } from '@components/ui-kit';
import { BottomSheet } from '@modals/BottomSheet';
import { TransportType } from '@shared/enums';
import {
	Bike,
	Bus,
	Car,
	Check,
	Plane,
	Ship,
	TrainFront,
} from '@tamagui/lucide-icons';
import { useState } from 'react';
import { ListItem, View, YGroup } from 'tamagui';

interface TransportItem {
	label: string;
	value: TransportType;
	Icon: React.ElementType;
}
const transports: Record<TransportType, TransportItem> = {
	[TransportType.Car]: {
		label: 'Car',
		value: TransportType.Car,
		Icon: Car,
	},
	[TransportType.Plane]: {
		label: 'Plane',
		value: TransportType.Plane,
		Icon: Plane,
	},
	[TransportType.Bike]: {
		label: 'Bike',
		value: TransportType.Bike,
		Icon: Bike,
	},
	[TransportType.Ship]: {
		label: 'Ship',
		value: TransportType.Ship,
		Icon: Ship,
	},
	[TransportType.Train]: {
		label: 'Train',
		value: TransportType.Train,
		Icon: TrainFront,
	},
	[TransportType.Bus]: {
		label: 'Bus',
		value: TransportType.Bus,
		Icon: Bus,
	},
};

interface SelectTransportProps {
	selected: TransportType;
	onSelect: (value: TransportType) => void;
}

export const SelectTransport = ({
	selected,
	onSelect,
}: SelectTransportProps) => {
	const [openBottomSheet, setOpenBottomSheet] = useState(false);

	const Icon = transports[selected].Icon;

	return (
		<View gap={8}>
			<LabelStyled fontSize={18}>Тип транспорта</LabelStyled>
			<InputField
				rounded={10}
				readOnly
				placeholder='Выберите тип транспорта'
				icon={
					<Icon
						size={22}
						color={'$accent'}
					/>
				}
				value={transports[selected].label}
				onPress={() => {
					setOpenBottomSheet(!openBottomSheet);
				}}
			/>
			<BottomSheet
				open={openBottomSheet}
				onOpenChange={setOpenBottomSheet}
				snapPoints={[30]}
			>
				<YGroup>
					{Object.values(transports).map((item) => (
						<YGroup.Item key={item.value}>
							<ListItem
								pressTheme
								onPress={() => {
									onSelect(item.value);
									setOpenBottomSheet(false);
								}}
								iconAfter={
									selected === item.value ? (
										<View
											p={4}
											bg={'$accent'}
											rounded={'$12'}
										>
											<Check size={14} />
										</View>
									) : null
								}
								icon={
									<item.Icon
										size={22}
										color={'$accent'}
									/>
								}
							>
								<ListItem.Text
									color={'$textPrimary'}
									fontSize={16}
								>
									{item.label}
								</ListItem.Text>
							</ListItem>
						</YGroup.Item>
					))}
				</YGroup>
			</BottomSheet>
		</View>
	);
};
