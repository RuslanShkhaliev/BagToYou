import { Divider } from '@/components/ui/Divider';
import React, { useMemo } from 'react';
import { Group, GroupProps, View } from 'tamagui';

interface FieldGroupProps<T> extends GroupProps {
	fields: T[];
	horizontal?: boolean;
	children: (item: T, index: number) => React.ReactNode;
}

export const FieldGroup = <T,>({
	horizontal = false,
	fields = [],
	children,
	...props
}: FieldGroupProps<T>) => {
	const itemMinWidth = useMemo(() => 100 / fields.length + '%', [fields]);
	return (
		<Group
			orientation={horizontal ? 'horizontal' : 'vertical'}
			overflow={'hidden'}
			rounded={16}
			{...props}
		>
			{fields.map((field, index) => (
				<React.Fragment key={index}>
					<View
						//@ts-expect-error
						minW={itemMinWidth}
					>
						{children(field, index)}
					</View>
					{index !== fields.length - 1 && <Divider vertical={horizontal} />}
				</React.Fragment>
			))}
		</Group>
	);
};
