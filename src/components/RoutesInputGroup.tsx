import { Divider } from '@/components/ui/Divider';
import { Input, Label, styled, YStack } from 'tamagui';

interface Props {
	from?: string;
	to?: string;
	onFromSelect: () => void;
	onToSelect: () => void;
}

const InputRoute = styled(Input, {
	width: '100%',
	height: 30,
	cursor: 'pointer',
	outlineStyle: 'none',
	fontSize: 16,
	paddingVertical: 6,
	unstyled: true,
	placeholderTextColor: '$graphite400',
	color: '$textPrimary',
});
const LabelStyled = styled(Label, {
	unstyled: true,
	color: '#716969',
	fontSize: 12,
});
export const RoutesInputGroup = ({ from = '', to = '', onFromSelect, onToSelect }: Props) => {
	return (
		<YStack width="100%" backgroundColor="$bgContent" borderRadius="15px">
			<YStack padding="10px">
				<LabelStyled htmlFor="route-from">Откуда</LabelStyled>
				<InputRoute
					id="route-from"
					placeholder="Например: Краснодар"
					readOnly
					value={from}
					onPress={onFromSelect}
				/>
			</YStack>
			<Divider />
			<YStack>
				<YStack padding="10px">
					<LabelStyled htmlFor="route-to">Куда</LabelStyled>
					<InputRoute
						id="route-to"
						readOnly
						placeholder="Например: Сингапур"
						value={to}
						onPress={onToSelect}
					/>
				</YStack>
			</YStack>
		</YStack>
	);
};
