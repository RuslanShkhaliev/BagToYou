import { AdModel, MediaAssetSchema } from '@shared/schemas';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
	FadeIn,
	FadeOut,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { Image, useWindowDimensions, View } from 'tamagui';

const AnimatedImage = Animated.createAnimatedComponent(Image);
export const CarouselMedia = ({ data }: { data: AdModel['media'] }) => {
	const scrollOffsetValue = useSharedValue<number>(0);
	const layout = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isImageViewVisible, setIsImageViewVisible] = useState(false);
	const fadeOpacity = useSharedValue(1);
	// Значения для анимации прозрачности
	const defaultData = useMemo(
		() =>
			data.length
				? data
				: [
						require('@assets/images/placeholder-image.jpg') as MediaAssetSchema,
					],
		[data],
	);

	const onChangeSlide = (index: number) => {
		if (index !== currentIndex) {
			setCurrentIndex(index);

			// Начинаем с полупрозрачности и плавно увеличиваем до полной непрозрачности
			fadeOpacity.value = 0.5;
			fadeOpacity.value = withTiming(1, {
				duration: 400,
			});
		}
	};

	return (
		<View id='carousel-component'>
			<View
				style={StyleSheet.absoluteFill}
				overflow={'hidden'}
			>
				<AnimatedImage
					key={currentIndex}
					source={(data || defaultData)[currentIndex]}
					width={layout.width}
					height={258}
					objectFit='cover'
					blurRadius={60}
					entering={FadeIn.duration(400)}
					exiting={FadeOut.duration(400)}
				/>
			</View>
			<Carousel
				loop={false}
				vertical={false}
				width={layout.width}
				height={258}
				snapEnabled={true}
				pagingEnabled={true}
				scrollAnimationDuration={1000}
				data={data || defaultData}
				onConfigurePanGesture={(g: {
					enabled: (arg0: boolean) => any;
				}) => {
					'worklet';
					g.enabled(false);
				}}
				onSnapToItem={onChangeSlide}
				defaultScrollOffsetValue={scrollOffsetValue}
				renderItem={({ item, index }) => (
					<View
						flex={1}
						justify='center'
					>
						<Pressable
							onPress={() => {
								setCurrentIndex(index);
								setIsImageViewVisible(true);
							}}
						>
							<Image
								objectFit={'contain'}
								resizeMode={'contain'}
								source={item}
								height={258}
								width={layout.width}
							/>
						</Pressable>
					</View>
				)}
			/>
		</View>
	);
};
