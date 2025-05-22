import { useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { GetProps, Stack, styled } from 'tamagui';

type SkeletonProps = GetProps<typeof Stack> & {
	width?: number | string;
	height?: number | string;
	rounded?: number;
	bg?: string;
	highlightColor?: string;
	duration?: number;
	animated?: boolean;
};

const SkeletonBase = styled(Stack, {
	overflow: 'hidden',
});

export const Skeleton = ({
	width = '100%',
	height = 20,
	rounded = 4,
	bg = '$bgContent',
	highlightColor = '$gray6',
	duration = 1500,
	animated = true,
	...props
}: SkeletonProps) => {
	const animatedValue = new Animated.Value(0);

	useEffect(() => {
		if (animated) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(animatedValue, {
						toValue: 1,
						duration,
						useNativeDriver: true,
					}),
					Animated.timing(animatedValue, {
						toValue: 0,
						duration,
						useNativeDriver: true,
					}),
				]),
			).start();
		}

		return () => {
			animatedValue.stopAnimation();
		};
	}, [animated, animatedValue, duration]);

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-Number(width), Number(width)],
	});

	return (
		<SkeletonBase
			width={width}
			height={height}
			rounded={rounded}
			bg={bg}
			{...props}
		>
			{animated && (
				<Animated.View
					style={[
						StyleSheet.absoluteFill,
						{
							transform: [{ translateX }],
							backgroundColor: highlightColor,
							width: '100%',
							height: '100%',
							opacity: 0.5,
						},
					]}
				/>
			)}
		</SkeletonBase>
	);
};
