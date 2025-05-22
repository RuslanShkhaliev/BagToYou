import { DetailsCard } from '@components/DetailsCard';
import { ParcelInfo } from '@shared/schemas';
import { XStack } from 'tamagui';

interface ParcelDetailsProps {
	title: string;
	data: ParcelInfo;
}

export const ParcelDetails = ({ title, data }: ParcelDetailsProps) => {
	const { length, width, height, weight } = data;
	return (
		<DetailsCard.Layout title={title}>
			<XStack
				flexWrap='wrap'
				gap={12}
			>
				<DetailsCard.SizeItem
					label='Высота'
					value={length}
					unit='см'
				/>
				<DetailsCard.SizeItem
					label='Ширина'
					value={width}
					unit='см'
				/>
				<DetailsCard.SizeItem
					label='Длина'
					value={height}
					unit='см'
				/>
				<DetailsCard.SizeItem
					label='Вес'
					value={weight}
					unit='кг'
				/>
			</XStack>
		</DetailsCard.Layout>
	);
};
