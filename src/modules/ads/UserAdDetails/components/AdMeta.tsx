import { Surface } from '@components/Surface';
import { TextThemed } from '@components/ui-kit';
import { getAdMetadata } from '@utils/getAdMetadata';
import { Timestamp } from 'firebase/firestore';
import { useMemo } from 'react';

interface AdMetaProps {
	createdAt: Timestamp;
	count: number;
}

export const AdMeta = ({ createdAt, count }: AdMetaProps) => {
	const adMetadata = useMemo(() => getAdMetadata({ createdAt }), [createdAt]);

	return (
		<Surface rounded={'$0'}>
			<TextThemed color={'$textSecondary'}>
				Объявление: № {count} / Осталось {adMetadata.daysLeft} дней,
				размещено {adMetadata.formattedCreationDate}
			</TextThemed>
		</Surface>
	);
};
