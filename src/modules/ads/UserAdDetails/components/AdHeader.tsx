import { AdMetrics } from '@components/AdMetrics/AdMetrics';
import { CarouselMedia } from '@components/CarouselMedia';
import { RewardsDetails } from '@components/RewardsDetails';
import { TextThemed } from '@components/ui-kit';
import { AdModel } from '@shared/schemas';
import { Header, View } from 'tamagui';

type AdHeaderProps = Pick<AdModel, 'metrics' | 'rewards' | 'name' | 'media'>;

export const AdHeader = ({ name, rewards, metrics, media }: AdHeaderProps) => {
	return (
		<View gap={8}>
			<CarouselMedia data={media} />
			<AdMetrics
				metrics={metrics}
				px={10}
			/>
			<Header
				gap={8}
				px={10}
			>
				<TextThemed fontSize={22}>{name}</TextThemed>
				<RewardsDetails value={rewards} />
			</Header>
		</View>
	);
};
