import { ParcelInfo } from '@shared/schema';
import { defaultsDeep } from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';
import { Pressable } from 'react-native';
import { Card, View } from 'tamagui';
import { DeliveryStore } from '../../store';
import { PresetItem } from './PresetItem';
import { presets } from './presets';

export const PresetsList = () => {
	const { setValue, control, getValues } = useFormContext<DeliveryStore>();

	const onSelect = (preset: ParcelInfo) => {
		// setValue('parcelInfo', preset);

		console.log(defaultsDeep(getValues('parcelInfo'), preset));
		console.log(getValues('parcelInfo'), preset);
	};
	return (
		<View
			flex={1}
			pt={30}
		>
			<Card gap={8}>
				{presets.map((preset) => (
					<Controller
						key={preset.size}
						name='parcelInfo'
						control={control}
						render={({ field }) => (
							<Pressable
								key={preset.size}
								onPress={() => {
									field.onChange({ ...preset.parcel });
									onSelect({ ...preset.parcel });
								}}
							>
								{({ pressed }) => (
									<PresetItem
										opacity={pressed ? 0.6 : 1}
										parcel={preset.parcel}
										selected={
											JSON.stringify(field.value) ===
											JSON.stringify(preset.parcel)
										}
										icon={preset.icon}
										size={preset.size}
									/>
								)}
							</Pressable>
						)}
					/>
				))}
			</Card>
		</View>
	);
};
