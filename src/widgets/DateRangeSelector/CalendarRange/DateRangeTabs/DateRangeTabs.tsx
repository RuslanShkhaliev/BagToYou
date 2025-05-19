import { useCallback } from 'react';
import { ToggleGroup } from 'tamagui';
import { formatDate } from '../../utils';
import { TabControl } from './TabControl';

export enum ActiveTab {
	WHEN,
	RETURN,
}
interface DateRangeTabsProps {
	activeTab?: ActiveTab;
	startDate?: string;
	endDate?: string;
	onChange: (value: ActiveTab) => void;
	onClear?: () => void;
}

export const DateRangeTabs = ({
	activeTab = ActiveTab.WHEN,
	onChange,
	startDate,
	endDate,
	onClear,
}: DateRangeTabsProps) => {
	const labelStart = formatDate(startDate) || '';
	const labelEnd = formatDate(endDate) || '';
	const onValueChange = useCallback(
		(value: string) => {
			onChange(Number(value));
		},
		[onChange],
	);
	return (
		<ToggleGroup
			bg={'$inputBg'}
			type={'single'}
			value={activeTab.toString()}
			disableDeactivation
			onValueChange={onValueChange}
		>
			<TabControl
				active={activeTab === ActiveTab.WHEN}
				label={labelStart}
				defaultLabel={'Отправление'}
				onClear={onClear}
				value={ActiveTab.WHEN.toString()}
			/>
			<TabControl
				active={activeTab === ActiveTab.RETURN}
				label={labelEnd}
				defaultLabel={'Прибытие'}
				value={ActiveTab.RETURN.toString()}
			/>
		</ToggleGroup>
	);
};
