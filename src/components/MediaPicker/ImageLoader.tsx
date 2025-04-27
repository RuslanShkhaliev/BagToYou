import { LoaderCircle } from '@tamagui/lucide-icons';
import { View } from 'tamagui';

interface ImageLoaderProps {
	loading: boolean;
}
export const ImageLoader = ({ loading }: ImageLoaderProps) => {
	if (!loading) {
		return null;
	}

	return (
		<View
			alignItems="center"
			justifyContent="center"
			width={100}
			height={100}
			borderRadius={16}
			backgroundColor="$bgContent"
		>
			<LoaderCircle size={40} color="$textPrimary" />
		</View>
	);
};
