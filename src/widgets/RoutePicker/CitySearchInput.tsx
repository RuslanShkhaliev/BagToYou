import { InputField, InputFieldProps } from '@/components/ui/Inputs';
import { Search } from '@tamagui/lucide-icons';
import React, { forwardRef } from 'react';
import { Input } from 'tamagui';

interface CitySearchInputProps extends InputFieldProps {
	active?: boolean;
}

export const CitySearchInput = forwardRef<Input, CitySearchInputProps>(
	({ active, icon, ...props }, ref) => {
		return (
			<InputField
				group
				ref={ref}
				icon={
					active ? (
						<Search
							color={'$textSecondary'}
							size={20}
							$group-focus={{ color: '$textPrimary' }}
						/>
					) : (
						icon
					)
				}
				disableAssist
				autoFocus={active}
				height={44}
				{...props}
			/>
		);
	},
);
