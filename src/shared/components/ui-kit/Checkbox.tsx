import { Check } from '@tamagui/lucide-icons';
import { useId } from 'react';
import { Checkbox as TCheckbox, XStack } from 'tamagui';
import { LabelStyled } from './LabelStyled';

export interface CheckboxProps {
	label?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
	const id = `checkbox-${useId()}`;
	return (
		<XStack
			gap={8}
			items={'center'}
		>
			<TCheckbox
				id={id}
				checked={checked}
				defaultChecked={checked}
				onCheckedChange={onChange}
				flexDirection='row'
				items='center'
				gap={8}
			>
				<TCheckbox.Indicator>
					<Check
						size={16}
						color='$textPrimary'
					/>
				</TCheckbox.Indicator>
			</TCheckbox>
			{label && (
				<LabelStyled
					unstyled
					htmlFor={id}
				>
					{label}
				</LabelStyled>
			)}
		</XStack>
	);
};
