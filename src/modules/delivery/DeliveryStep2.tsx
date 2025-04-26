import { PageWrapper } from '@/components/PageWrapper';
import { InputThemed } from '@/components/ui/InputThemed';
import { useDeliveryStore } from '@/modules/delivery/store';
import { imagePicker } from '@/utils/imagePicker';
import { Check, HardDriveDownload, Trash } from '@tamagui/lucide-icons';
import { ImagePickerAsset } from 'expo-image-picker';
import { useState } from 'react';
import {
	Button,
	Checkbox,
	Form,
	Image,
	Label,
	ScrollView,
	styled,
	Text,
	TextArea,
	View,
	XStack,
	YStack,
} from 'tamagui';

const LabelStyled = styled(Label, {
	fontSize: 18,
	color: '$textPrimary',
});
const MAX_IMAGE_COUNT = 3;
export const DeliveryStep2 = () => {
	const deliveryStore = useDeliveryStore();
	const [isMe, setIsMe] = useState(false);
	const [images, setImages] = useState<ImagePickerAsset[]>([]);
	const [width, setWidth] = useState<string>('');
	const [height, setHeight] = useState<string>('');
	const [length, setLength] = useState<string>('');
	const [weight, setWeight] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [rewards, setRewards] = useState<string>('');

	const imgPicker = imagePicker({
		allowsMultipleSelection: true,
		allowsEditing: true,
		onImagePicked: (images) => {
			setImages((state) => [...state, ...images]);
		},
	});

	const pickImage = () => {
		if (images.length >= MAX_IMAGE_COUNT) {
			return;
		}
		imgPicker.pickImage();
	};
	const removeImg = (uri: string) => {
		const newImages = images.filter((image) => image.uri !== uri);
		setImages(() => newImages);
	};

	return (
		<PageWrapper>
			<Form gap="$6">
				<YStack gap={4}>
					<LabelStyled>Получатель</LabelStyled>
					<YStack>
						<XStack gap="$3" alignItems="center">
							<Checkbox id="checkbox-recipient" checked={isMe} onCheckedChange={setIsMe}>
								<Checkbox.Indicator>
									<Check />
								</Checkbox.Indicator>
							</Checkbox>
							<Label padding={0} height={14} color="$textPrimary" htmlFor="checkbox-recipient">
								Выбрать себя получателем
							</Label>
						</XStack>
						<Text color="$textSecondary" fontSize={10}>
							заполним данными указанными в профиле
						</Text>
					</YStack>
					<InputThemed placeholder="Имя" />
					<InputThemed placeholder="Фамилия" />
					<InputThemed placeholder="Телефон для связи" />
				</YStack>
				<YStack>
					<LabelStyled>Посылка</LabelStyled>
					<YStack gap={10}>
						<YStack>
							<XStack gap="$3" alignItems="center">
								<YStack flex={1}>
									<LabelStyled fontSize={10}>Width(cm)</LabelStyled>
									<InputThemed placeholder="width (cm)" value={width} onChangeText={setWidth} />
								</YStack>
								<YStack flex={1}>
									<LabelStyled fontSize={10}>Length(cm)</LabelStyled>
									<InputThemed placeholder="length (cm)" value={length} onChangeText={setLength} />
								</YStack>
							</XStack>
							<XStack gap="$3" alignItems="center">
								<YStack flex={1}>
									<LabelStyled fontSize={10}>Height(cm)</LabelStyled>
									<InputThemed placeholder="height (cm)" value={height} onChangeText={setHeight} />
								</YStack>
								<YStack flex={1}>
									<LabelStyled fontSize={10}>Weight(kg)</LabelStyled>
									<InputThemed placeholder="weight (kg)" value={weight} onChangeText={setWeight} />
								</YStack>
							</XStack>
						</YStack>
						<YStack>
							<LabelStyled fontSize={12}>Загрузить фото</LabelStyled>
							{images.length > 0 && (
								<ScrollView horizontal>
									<XStack gap="$2" paddingVertical={20}>
										{images.map((image) => (
											<View
												key={image.uri + Date.now()}
												aspectRatio={1}
												width={100}
												height={100}
												overflow="hidden"
												borderRadius={16}
												backgroundColor="$bgContent"
												position="relative"
											>
												<Button
													backgroundColor="$black40"
													position="absolute"
													right={2}
													bottom={2}
													size={26}
													circular
													icon={<Trash color="$white" />}
													zIndex={1}
													onPress={() => removeImg(image.uri)}
												/>
												<Image
													source={{ uri: image.uri }}
													width="100%"
													height="100%"
													borderRadius={8}
													marginRight="$2"
												/>
											</View>
										))}
									</XStack>
								</ScrollView>
							)}
							<Button onPress={pickImage} icon={<HardDriveDownload size={18} color="$blue800" />} />
						</YStack>
						<YStack>
							<LabelStyled fontSize={12}>Подробное описание</LabelStyled>
							<TextArea
								backgroundColor="$inputBg"
								color="$textPrimary"
								value={description}
								borderColor="$inputBg"
								onChangeText={setDescription}
								focusStyle={{ borderColor: '$orange500' }}
							/>
						</YStack>
					</YStack>
				</YStack>
				<YStack>
					<LabelStyled htmlFor="input-rewards">Укажите вознаграждение</LabelStyled>
					<InputThemed
						id="input-rewards"
						value={rewards}
						onChangeText={setRewards}
						placeholder="1000"
					/>
				</YStack>
				<Form.Trigger asChild>
					<Button size="$4" fontSize={18}>
						Опубликовать
					</Button>
				</Form.Trigger>
			</Form>
		</PageWrapper>
	);
};
