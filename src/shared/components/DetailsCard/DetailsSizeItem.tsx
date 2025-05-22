import { TextThemed } from '@components/ui-kit';
import { NBSP } from '@shared/unicodes';
import { View } from 'tamagui';

interface SizeDetailsProps {
	label: string;
	value: string;
	unit?: string;
}

export const DetailsSizeItem = ({ label, value, unit }: SizeDetailsProps) => {
	return (
		<View
			bg='$surfaceHover'
			px={16}
			py={8}
			rounded={8}
			minW={100}
		>
			<TextThemed
				color='$textSecondary'
				fontSize={14}
			>
				{label}
			</TextThemed>
			<TextThemed fontWeight='500'>
				{value}
				{NBSP}
				{unit}
			</TextThemed>
		</View>
	);
};
