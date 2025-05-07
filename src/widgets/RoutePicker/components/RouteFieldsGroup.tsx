import { Input, YGroup } from 'tamagui';

import { Divider, InputField, InputFieldProps } from '@components/ui-kit';
import { MapPin } from '@tamagui/lucide-icons';
import { forwardRef } from 'react';

export type RouteFieldRef = React.Ref<Input>;

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

interface RouteFieldsGroupProps {
	fieldFrom: RouteFieldProps & { ref: RouteFieldRef };
	fieldTo: RouteFieldProps & { ref: RouteFieldRef };
	readOnly?: boolean;
	onlyTo?: boolean;
}

export const RouteFieldsGroup = ({
	fieldFrom,
	fieldTo,
	readOnly = false,
	onlyTo = false,
}: RouteFieldsGroupProps) => {
	return (
		<YGroup
			bg={'$inputBg'}
			overflow={'hidden'}
			rounded={16}
		>
			{!onlyTo && (
				<YGroup.Item>
					<RouteField
						readOnly={readOnly}
						placeholder='Origin'
						{...fieldFrom}
					/>
				</YGroup.Item>
			)}
			<Divider />
			<YGroup.Item>
				<RouteField
					readOnly={readOnly}
					placeholder='Where to'
					{...fieldTo}
				/>
			</YGroup.Item>
		</YGroup>
	);
};
