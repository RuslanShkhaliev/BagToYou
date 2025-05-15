import { Checkbox, View } from 'tamagui';

import { TextThemed } from '@components/ui-kit';

import { LabelStyled } from '@components/ui-kit';
import { Check } from '@tamagui/lucide-icons';
import { useId } from 'react';
import { XStack } from 'tamagui';

interface CheckboxSelfProps {
	label: string;
	description?: string;
	isChecked: boolean;
	onCheck: (isChecked: boolean) => void;
}
export const CheckboxSelf = ({
	label,
	description,
	isChecked,
	onCheck,
}: CheckboxSelfProps) => {
	const checkboxId = useId();

	return (
		<XStack
			gap='$3'
			items='center'
		>
			<Checkbox
				id={checkboxId}
				size='$5'
				checked={isChecked}
				defaultChecked={isChecked}
				onCheckedChange={onCheck}
			>
				<Checkbox.Indicator>
					<Check color='$textPrimary' />
				</Checkbox.Indicator>
			</Checkbox>
			<LabelStyled
				fontSize={14}
				htmlFor={checkboxId}
			>
				<View>
					<TextThemed fontSize={16}>{label}</TextThemed>
					<TextThemed
						color='$textSecondary'
						fontSize={14}
					>
						{description}
					</TextThemed>
				</View>
			</LabelStyled>
		</XStack>
	);
};
