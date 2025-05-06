import { ButtonStyled } from '@/components/ui/buttons/ButtonStyled';
import { ImageUp } from '@tamagui/lucide-icons';
import { Spinner } from 'tamagui';

interface ImageLoaderProps {
	loading: boolean;
	onPress?: () => void;
}

export const ImageLoader = ({ loading, onPress }: ImageLoaderProps) => {
	return (
		<ButtonStyled
			onPress={onPress}
			items='center'
			justify='center'
			minW={120}
			minH={120}
			rounded={16}
			bg='$bgContent'
		>
			{loading ? (
				<Spinner
					size={'large'}
					color='$textPrimary'
				/>
			) : (
				<ImageUp
					size={50}
					color={'$textSecondary'}
				/>
			)}
		</ButtonStyled>
	);
};
