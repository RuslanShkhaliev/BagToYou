import { MediaAssetSchema } from '@shared/schema';
import { Trash } from '@tamagui/lucide-icons';
import { useId } from 'react';
import { Button, Image, View } from 'tamagui';

interface ImagePreviewProps extends MediaAssetSchema {
	onRemove?: (uri: string) => void;
}

export const ImagePreview = ({ onRemove, ...asset }: ImagePreviewProps) => {
	return (
		<View
			key={asset.uri + useId()}
			minW={150}
			height={150}
			overflow='hidden'
			rounded={16}
			bg='$bgContent'
			position='relative'
		>
			<Button
				bg='$black40'
				position='absolute'
				r={2}
				b={2}
				size={26}
				circular
				icon={<Trash color='$white' />}
				z={1}
				onPress={() => onRemove?.(asset.uri)}
			/>
			{asset.type === 'video' ? null : (
				<Image
					source={{ uri: asset.uri }}
					width='100%'
					height='100%'
					borderRadius={8}
					mr='$2'
				/>
			)}
		</View>
	);
};
