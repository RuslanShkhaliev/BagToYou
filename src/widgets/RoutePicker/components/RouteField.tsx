import { InputField, InputFieldProps } from '@/components/ui/Inputs';
import React, { forwardRef } from 'react';
import { Input } from 'tamagui';

export type RouteFieldRef = React.ElementRef<typeof RouteField>;

export interface RouteFieldProps extends InputFieldProps {
	active?: boolean;
}

export const RouteField = forwardRef<Input, RouteFieldProps>(
	({ active, ...props }, ref) => {
		return (
			<InputField
				ref={ref}
				group
				disableAssist
				autoFocus={active}
				height={44}
				{...props}
			/>
		);
	},
);
