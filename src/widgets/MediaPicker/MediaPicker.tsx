import { LabelStyled } from '@components/ui-kit';
import { useMediaPicker } from '@hooks/useMediaPicker';
import { MediaAsset, mediaAssetSchema } from '@shared/schema';
import * as ImgPicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import { XStack, YStack } from 'tamagui';
import { ImageLoader } from './ImageLoader';
import { ImagePreview } from './ImagePreview';

interface ImagePickerProps extends ImgPicker.ImagePickerOptions {
	maxImageCount?: number;
	media?: MediaAsset[];
	label?: string;
	onPicked?: (files: MediaAsset[]) => void;
	onRemove?: (file: MediaAsset) => void;
	onUpdate?: (files: MediaAsset[]) => void;
}

const MAX_IMAGE_COUNT = 5;

export const MediaPicker = ({
	maxImageCount = MAX_IMAGE_COUNT,
	media = [],
	mediaTypes = ['images'],
	onPicked,
	onRemove,
	label,
	onUpdate,
	...props
}: ImagePickerProps) => {
	const [items, setItems] = useState<MediaAsset[]>([...media]);
	const { pick, loading } = useMediaPicker({
		allowsMultipleSelection: true,
		allowsEditing: true,
		mediaTypes,
		...props,
		onPicked: (images) => {
			setItems((state) => {
				const newImages: MediaAsset[] = images.map((image) =>
					mediaAssetSchema.parse(image),
				);
				onPicked?.(newImages);
				return [...state, ...newImages];
			});
		},
	});

	const mediaReversed = useMemo(() => [...items].reverse(), [items]);

	useEffect(() => {
		onUpdate?.(items);
	}, [items]);

	const pickMedia = () => {
		if (items.length >= maxImageCount) {
			return;
		}
		pick();
	};
	const removeImg = (uri: string) => {
		const removedImg = items.find((image) => image.uri === uri)!;

		setItems(() => items.filter((image) => image.uri !== uri));
		onRemove?.(removedImg);
	};

	return (
		<YStack>
			{label && (
				<LabelStyled
					px={12}
					fontSize={20}
					mb={10}
				>
					{label}
				</LabelStyled>
			)}
			<XStack
				gap='$3'
				flexWrap={'wrap'}
			>
				<ImageLoader
					loading={loading}
					onPress={pickMedia}
				/>

				{mediaReversed.map((media) => (
					<ImagePreview
						key={media.uri}
						onRemove={removeImg}
						{...media}
					/>
				))}
			</XStack>
		</YStack>
	);
};
