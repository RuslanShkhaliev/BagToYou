import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';

interface Props extends ImagePicker.ImagePickerOptions {
	onImagePicked: (files: ImagePickerAsset[]) => void;
}
export const imagePicker = ({
	mediaTypes = ['images', 'videos'],
	quality = 1,
	aspect = [4, 3],
	onImagePicked,
	...restOptions
}: Props) => {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes,
			aspect,
			quality,
			allowsEditing: true,
			...restOptions,
		});

		console.log(result, 'result');

		if (!result.canceled) {
			onImagePicked(result.assets);
		}
		return result;
	};

	return { pickImage };
};
