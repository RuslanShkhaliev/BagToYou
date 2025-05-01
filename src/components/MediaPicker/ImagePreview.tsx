import { MediaAsset } from '@/common/schema';
import { Trash } from '@tamagui/lucide-icons';
import { Button, Image, View } from 'tamagui';

interface ImagePreviewProps extends MediaAsset {
	onRemove?: (uri: string) => void;
}
export const ImagePreview = ({ onRemove, ...asset }: ImagePreviewProps) => {
	return (
		<View
			key={asset.uri + Date.now()}
			width={100}
			height={100}
			overflow='hidden'
			borderRadius={16}
			backgroundColor='$bgContent'
			position='relative'
		>
			<Button
				backgroundColor='$black40'
				position='absolute'
				right={2}
				bottom={2}
				size={26}
				circular
				icon={<Trash color='$white' />}
				zIndex={1}
				onPress={() => onRemove?.(asset.uri)}
			/>
			{asset.type === 'video' ? null : (
				<Image
					source={{ uri: asset.uri }}
					width='100%'
					height='100%'
					borderRadius={8}
					marginRight='$2'
				/>
			)}
		</View>
	);
};
