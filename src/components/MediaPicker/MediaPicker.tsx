import { MediaAsset, mediaAssetSchema } from '@/common/schema';
import { ImageLoader } from '@/components/MediaPicker/ImageLoader';
import { ImagePreview } from '@/components/MediaPicker/ImagePreview';
import { LabelStyled } from '@/components/ui/LabelStyled';
import { useMediaPicker } from '@/hooks/useMediaPicker';
import { HardDriveDownload, Loader } from '@tamagui/lucide-icons';
import * as ImgPicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import { Button, ScrollView, XStack, YStack } from 'tamagui';


interface ImagePickerProps extends ImgPicker.ImagePickerOptions {
	maxImageCount?: number;
	media?: MediaAsset[];
	onPicked?: (files: MediaAsset[]) => void;
	onRemove?: (file: MediaAsset) => void;
	onUpdate?: (files: MediaAsset[]) => void;
}


const MAX_IMAGE_COUNT = 3;

export const MediaPicker = ({
	maxImageCount = MAX_IMAGE_COUNT,
	media = [],
	mediaTypes = ['images'],
	onPicked,
	onRemove,
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
			<LabelStyled fontSize={12}>Загрузить фото</LabelStyled>
			{items.length > 0 && (
				<ScrollView horizontal>
					<XStack
						gap="$2"
						py={20}
					>
						<ImageLoader loading={loading} />
						{mediaReversed.map((media) => (
							<ImagePreview
								key={media.uri}
								{...media}
								onRemove={removeImg}
							/>
						))}
					</XStack>
				</ScrollView>
			)}
			<Button
				onPress={pickMedia}
				disabled={loading}
				icon={
					loading ? (
						<Loader />
					) : (
						<HardDriveDownload
							size={18}
							color="$blue800"
						/>
					)
				}
			/>
		</YStack>
	);
};
