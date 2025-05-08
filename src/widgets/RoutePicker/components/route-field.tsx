import { InputField, InputFieldProps } from '@components/ui-kit';
import { MapPin } from '@tamagui/lucide-icons';
import { forwardRef } from 'react';
import { Input } from 'tamagui';

export type RouteFieldRef = React.Ref<Input>;

export interface RouteFieldProps extends InputFieldProps {
	ref?: RouteFieldRef;
	error?: string;
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
				inValid={!!props.error}
				{...props}
			/>
		);
	},
);
