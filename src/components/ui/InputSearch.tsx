import { Search, XCircle } from '@tamagui/lucide-icons';
import { Input, InputProps, XStack } from 'tamagui';

interface Props extends InputProps {
	clearable?: boolean;
	onChangeText: (val: string) => void;
}
export const InputSearch = ({ clearable = true, onChangeText, ...props }: Props) => {
	const clear = () => {
		onChangeText('');
	};
	return (
		<XStack alignItems="center">
			<Search position="absolute" left={10} size={20} color="$white" />
			<Input
				{...props}
				paddingLeft={40}
				onChangeText={onChangeText}
				backgroundColor="$inputBg"
				color="$textPrimary"
			/>
			{clearable && props.value && (
				<XCircle color="$white" size={18} position="absolute" right={8} onPress={clear} />
			)}
		</XStack>
	);
};
