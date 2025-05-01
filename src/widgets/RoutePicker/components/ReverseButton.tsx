import { ArrowDownUp } from '@tamagui/lucide-icons';
import React from 'react';
import { Button, ButtonProps } from 'tamagui';

export const ReverseButton = ({ onPress }: ButtonProps) => {
	return (
		<Button
			onPress={onPress}
			unstyled
			borderWidth={0}
			bg={'transparent'}
			p={8}
			rounded={'$2'}
			pressStyle={{
				opacity: 0.8,
				scale: 0.95,
			}}
			icon={
				<ArrowDownUp
					size={18}
					color={'$textSecondary'}
				/>
			}
		/>
	);
};
