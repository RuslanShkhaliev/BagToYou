import { AdMetricsItem } from '@components/AdMetrics/AdMetricsItem';
import { AdMetricsModel } from '@shared/schemas';
import { Eye, Heart, User } from '@tamagui/lucide-icons';
import { XStack, XStackProps } from 'tamagui';

interface AdMetricsProps extends XStackProps {
	metrics: AdMetricsModel;
	size?: 'small' | 'large';
}

export const AdMetrics = ({
	metrics,
	size = 'large',
	...props
}: AdMetricsProps) => {
	const { views, comments, likes } = metrics;
	return (
		<XStack
			gap={size === 'small' ? 10 : 20}
			{...props}
		>
			<AdMetricsItem
				Icon={Eye}
				value={views}
				size={size}
			/>
			{Boolean(comments) && (
				<AdMetricsItem
					Icon={User}
					value={comments}
					size={size}
				/>
			)}
			{Boolean(likes) && (
				<AdMetricsItem
					Icon={Heart}
					value={likes}
					size={size}
				/>
			)}
		</XStack>
	);
};
