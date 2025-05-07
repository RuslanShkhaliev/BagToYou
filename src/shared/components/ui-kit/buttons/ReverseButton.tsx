import { ButtonStyled } from '@components/ui-kit/buttons/ButtonStyled';
import { ArrowDownUp } from '@tamagui/lucide-icons';
import React from 'react';
import { ButtonProps } from 'tamagui';

export const ReverseButton = (props: ButtonProps) => {
	return (
		<ButtonStyled
			p={8}
			ghost
			aspectRatio={1}
			pressStyle={{
				bg: '$black16',
			}}
			icon={
				<ArrowDownUp
					size={18}
					color={'$textSecondary'}
				/>
			}
			{...props}
		/>
	);
};
