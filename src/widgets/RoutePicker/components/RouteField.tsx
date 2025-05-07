import { InputField, InputFieldProps } from '@components/ui-kit';
import { MapPin } from '@tamagui/lucide-icons';
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
				icon={
					<MapPin
						size={18}
						color={'$textSecondary'}
					/>
				}
				disableAssist
				autoFocus={active}
				height={50}
				editable={!props.readOnly}
				{...props}
			/>
		);
	},
);
