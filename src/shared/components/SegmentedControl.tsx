import { TextProps, ViewProps } from '@tamagui/core';
import { useCallback } from 'react';
import { ToggleGroup, ToggleGroupSingleProps } from 'tamagui';
import { ToggleGroupItem } from './ToggleGroupItem';
import { TextThemed } from './ui-kit';

type OptionVal = string | number;

interface SegmentedOption<T> {
	value: T;
	label: React.ReactNode;
}

interface SegmentedControlProps<T extends OptionVal> {
	options: SegmentedOption<T>[];
	type?: ToggleGroupSingleProps['type'];
	value?: T;
	labelStyles?: TextProps;
	containerStyles?: ViewProps;
	onChange?: (selected: T) => void;
}

export const SegmentedControl = <T extends OptionVal>({
	options,
	value,
	onChange,
	type = 'single',
	labelStyles,
	containerStyles,
	...props
}: SegmentedControlProps<T>) => {
	const handleChange = useCallback(
		(value: string) => {
			const selectedOption = options.find(
				(option) => option.value == value,
			);
			if (selectedOption) {
				onChange?.(selectedOption.value);
			}
		},
		[options, onChange],
	);

	return (
		<ToggleGroup
			width={'100%'}
			defaultValue={String(value)}
			value={String(value)}
			disableDeactivation
			onValueChange={handleChange}
			{...props}
			{...containerStyles}
			type={type}
		>
			{options.map((option) => (
				<ToggleGroupItem
					flex={1}
					key={String(option.value)}
					value={String(option.value)}
					active={value === option.value}
				>
					<TextThemed {...labelStyles}>{option.label}</TextThemed>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};
