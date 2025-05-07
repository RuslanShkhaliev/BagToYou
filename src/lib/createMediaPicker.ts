import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';

export interface CreateMediaPickerProps extends ImagePicker.ImagePickerOptions {
	onPicked: (files: ImagePickerAsset[]) => void;
}
export const createMediaPicker = ({
	mediaTypes = ['images', 'videos'],
	quality = 1,
	aspect = [4, 3],
	onPicked,
	...restOptions
}: CreateMediaPickerProps) => {
	const pick = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes,
			aspect,
			quality,
			allowsEditing: true,
			...restOptions,
		});

		if (!result.canceled) {
			onPicked(result.assets);
		}
		return result;
	};

	return { pick };
};
