import { BottomSheet } from '@modals/BottomSheet';
import { InputField, LabelStyled, TextThemed } from '@shared/components/ui-kit';
import { Check } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { ListItem, View, YGroup } from 'tamagui';

export interface SelectOption<T> {
	label: string;
	value: T;
	Icon?: React.ElementType;
}

interface SelectWithBottomSheetBaseProps {
	placeholder?: string;
	label?: string;
	snapPoints?: number[];
	snapPointsMode?: 'percent' | 'constant';
	bottomSheetTitle?: string;
}

interface SelectWithBottomSheetMultipleProps<T>
	extends SelectWithBottomSheetBaseProps {
	options: SelectOption<T>[];
	value: T[];
	onChange: (value: T[]) => void;
	multiple?: true;
	renderCustomOption?: (
		option: SelectOption<T>,
		isSelected: boolean,
	) => React.ReactNode;
}

interface SelectWithBottomSheetSingleProps<T>
	extends SelectWithBottomSheetBaseProps {
	options: SelectOption<T>[];
	value: T;
	multiple?: false;
	onChange: (value: T) => void;
	renderCustomOption?: (
		option: SelectOption<T>,
		isSelected: boolean,
	) => React.ReactNode;
}

type SelectWithBottomSheetProps<T> =
	| SelectWithBottomSheetMultipleProps<T>
	| SelectWithBottomSheetSingleProps<T>;

export function SelectWithBottomSheet<T>(props: SelectWithBottomSheetProps<T>) {
	const {
		options,
		value,
		onChange,
		placeholder = 'Выберите значение',
		label,
		multiple = false,
		snapPoints = [300],
		snapPointsMode = 'constant',
		bottomSheetTitle,
		renderCustomOption,
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const selectedValues = Array.isArray(value) ? value : [value];

	const getDisplayValue = () => {
		if (Array.isArray(value) && value.length === 0) return '';
		if (!Array.isArray(value) && value === undefined) return '';

		const selected = options.filter((option) =>
			Array.isArray(value)
				? value.includes(option.value)
				: option.value === value,
		);

		if (selected.length === 0) return '';

		return selected.map((item) => item.label).join(', ');
	};

	const displayValue = getDisplayValue();

	const handleToggle = () => setIsOpen(!isOpen);

	const handleSelectMultiple = (option: SelectOption<T>) => {
		const multipleOnChange = onChange as (value: T[]) => void;

		if (selectedValues.includes(option.value)) {
			const newSelected = selectedValues.filter(
				(v) => v !== option.value,
			);
			// Предотвращаем очистку всех выбранных значений
			if (newSelected.length === 0) return;

			multipleOnChange(newSelected);
		} else {
			multipleOnChange([...selectedValues, option.value]);
		}
	};

	const handleSelect = (option: SelectOption<T>) => {
		if (multiple) {
			handleSelectMultiple(option);
		} else {
			const singleOnChange = onChange as (value: T) => void;
			singleOnChange(option.value);
			setIsOpen(false);
		}
	};

	const isSelected = (option: SelectOption<T>) =>
		selectedValues.includes(option.value);

	return (
		<View gap={8}>
			{label && <LabelStyled fontSize={18}>{label}</LabelStyled>}
			<InputField
				rounded={10}
				value={displayValue || ''}
				placeholder={placeholder}
				readOnly
				onPress={handleToggle}
			/>
			<BottomSheet
				open={isOpen}
				onOpenChange={setIsOpen}
				snapPoints={snapPoints}
				snapPointsMode={snapPointsMode}
				title={
					bottomSheetTitle ? (
						<TextThemed
							fontWeight={600}
							fontSize={20}
						>
							{bottomSheetTitle}
						</TextThemed>
					) : undefined
				}
			>
				<YGroup pt={'$4'}>
					{options.map((option) => (
						<YGroup.Item key={String(option.value)}>
							{renderCustomOption ? (
								renderCustomOption(option, isSelected(option))
							) : (
								<ListItem
									pressTheme
									onPress={() => handleSelect(option)}
									iconAfter={
										isSelected(option) ? (
											<View
												p={4}
												bg={'$accent'}
												rounded={'$12'}
											>
												<Check size={16} />
											</View>
										) : undefined
									}
									icon={
										option?.Icon ? (
											<option.Icon
												size={22}
												color={'$accent'}
											/>
										) : undefined
									}
								>
									<ListItem.Text
										color={'$textPrimary'}
										fontSize={16}
									>
										{option.label}
									</ListItem.Text>
								</ListItem>
							)}
						</YGroup.Item>
					))}
				</YGroup>
			</BottomSheet>
		</View>
	);
}
