import { Search, X } from '@tamagui/lucide-icons';
import { Button, Input, InputProps, XStack } from 'tamagui';

interface Props extends InputProps {
	clearable?: boolean;
	onChangeText: (val: string) => void;
}
export const InputSearch = ({ clearable = true, onChangeText, ...props }: Props) => {
	const clear = () => {
		onChangeText('');
	};
	return (
		<XStack alignItems="center" group>
			<Search
				position="absolute"
				left={10}
				size={20}
				color="$graphite300"
				$group-focusWithin={{
					color: '$textPrimary',
				}}
			/>
			<Input
				paddingLeft={52}
				paddingVertical={14}
				paddingRight={54}
				onChangeText={onChangeText}
				backgroundColor="$inputBg"
				color="$textPrimary"
				borderWidth={0}
				$group-focus={{
					color: 'red',
				}}
				{...props}
			/>
			{clearable && Boolean(props.value?.length) && (
				<Button
					position="absolute"
					right={14}
					borderRadius="50%"
					width={20}
					height={20}
					padding={0}
					alignItems="center"
					justifyContent="center"
					backgroundColor="$graphite500"
					onPress={clear}
				>
					<X color="$white" size={12} />
				</Button>
			)}
		</XStack>
	);
};
