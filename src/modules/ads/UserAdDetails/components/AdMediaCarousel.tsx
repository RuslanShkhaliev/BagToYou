import { AdModel } from '@shared/schemas';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { Image, useWindowDimensions, View } from 'tamagui';

export const AdMediaCarousel = ({ data }: { data: AdModel['media'] }) => {
	const scrollOffsetValue = useSharedValue<number>(0);
	const layout = useWindowDimensions();

	const defaultData = [require('@assets/images/placeholder-image.jpg')];

	return (
		<View
			id='carousel-component'
			dataSet={{ kind: 'basic-layouts', name: 'normal' }}
		>
			<Carousel
				vertical={false}
				width={layout.width}
				height={258}
				snapEnabled={true}
				pagingEnabled={true}
				autoPlayInterval={2000}
				data={data || defaultData}
				defaultScrollOffsetValue={scrollOffsetValue}
				onConfigurePanGesture={(g: {
					enabled: (arg0: boolean) => any;
				}) => {
					'worklet';
					g.enabled(false);
				}}
				renderItem={({ item }) => {
					return (
						<View flex={1}>
							<Image
								source={item}
								height={258}
								width={layout.width}
							/>
						</View>
					);
				}}
			/>
		</View>
	);
};
