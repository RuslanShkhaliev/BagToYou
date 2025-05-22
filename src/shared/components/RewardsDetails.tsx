import { TextThemed } from '@components/ui-kit';
import { NBSP } from '@shared/unicodes';

interface RewardsDetailsProps {
	value: string;
	currency?: string;
}

export const RewardsDetails = ({
	value,
	currency = '₽',
}: RewardsDetailsProps) => {
	return (
		<TextThemed
			fontSize={24}
			fontWeight={700}
		>
			{value}
			{NBSP}
			{currency}
		</TextThemed>
	);
};
