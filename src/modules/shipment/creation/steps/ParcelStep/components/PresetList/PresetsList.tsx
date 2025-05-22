import { useMemo } from 'react';
import { Pressable } from 'react-native';
import { useFormParcelStep } from 'src/modules/shipment/creation/steps/ParcelStep/useFormParcelStep';
import { ParcelInfo } from 'src/shared/schemas';
import { Card, View } from 'tamagui';
import { PresetItem } from './PresetItem';
import { presets } from './presets';

export const PresetsList = () => {
	const { onSelectParcel, parcel } = useFormParcelStep();

	const isPresetSelected = useMemo(
		() => (preset: ParcelInfo) =>
			JSON.stringify(parcel) === JSON.stringify(preset),
		[parcel],
	);

	return (
		<View
			flex={1}
			pt={30}
		>
			<Card gap={8}>
				{presets.map((preset) => (
					<Pressable
						key={preset.size}
						onPress={() => {
							onSelectParcel(preset.parcel);
						}}
					>
						{({ pressed }) => (
							<PresetItem
								opacity={pressed ? 0.6 : 1}
								parcel={preset.parcel}
								selected={isPresetSelected(preset.parcel)}
								icon={preset.icon}
								size={preset.size}
							/>
						)}
					</Pressable>
				))}
			</Card>
		</View>
	);
};
