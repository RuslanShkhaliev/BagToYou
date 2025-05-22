import { AdMetrics } from '@components/AdMetrics/AdMetrics';
import { RewardsDetails } from '@components/RewardsDetails';
import { TextThemed } from '@components/ui-kit';
import { AdMediaCarousel } from '@modules/ads/UserAdDetails/components/AdMediaCarousel';
import { AdModel } from '@shared/schemas';
import { Header, View } from 'tamagui';

type AdHeaderProps = Pick<AdModel, 'metrics' | 'rewards' | 'name' | 'media'>;

export const AdHeader = ({ name, rewards, metrics, media }: AdHeaderProps) => {
	return (
		<View gap={8}>
			<AdMediaCarousel data={media} />
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
