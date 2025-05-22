import { SegmentedControl } from '@components/SegmentedControl';
import { ErrorMessage } from '@components/ui-kit';
import { DateType } from '@modules/shipment/creation/interfaces';
import { DateShipmentSchema } from '@shared/schemas/adShipment';
import { DateRangeSelector } from '@widgets/DateRangeSelector';
import React from 'react';
import { DateISOSchema } from 'src/shared/schemas';
import { View } from 'tamagui';

interface DatePartySelectorProps extends DateShipmentSchema {
	error?: string;
	onChangeType: (type: DateType) => void;
	onSelectDate: (value: DateISOSchema) => void;
}

export const DatePartySelector = ({
	type,
	value,
	error,
	onChangeType,
	onSelectDate,
}: DatePartySelectorProps) => {
	return (
		<View gap={8}>
			<SegmentedControl
				value={type}
				containerStyles={{
					height: 55,
				}}
				labelStyles={{
					fontSize: 16,
				}}
				options={[
					{
						value: DateType.BY_DATE,
						label: 'К определенной дате',
					},
					{
						value: DateType.ASAP,
						label: 'Как можно скорее',
					},
				]}
				onChange={onChangeType}
			/>
			{type === DateType.BY_DATE && (
				<React.Fragment>
					<DateRangeSelector
						date={value}
						controlStyles={{
							height: 60,
							placeholder: 'Выберите дату',
						}}
						onChange={onSelectDate}
					/>
					<ErrorMessage message={error} />
				</React.Fragment>
			)}
		</View>
	);
};
