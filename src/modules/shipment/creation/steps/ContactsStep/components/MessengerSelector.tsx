import {
	SelectOption,
	SelectWithBottomSheet,
} from '@shared/components/ui-kit/selects';
import { MessengerType } from '@shared/enums';

interface MessengerSelectorProps {
	selected: MessengerType[];
	label?: string;
	onChange: (social: MessengerType[]) => void;
}

export const MessengerSelector = ({
	selected = [MessengerType.fb],
	label = 'Выберите мессенджер',
	onChange,
}: MessengerSelectorProps) => {
	const options: SelectOption<MessengerType>[] = Object.values(
		MessengerType,
	).map((value) => ({
		label: value,
		value,
	}));

	return (
		<SelectWithBottomSheet
			options={options}
			value={selected}
			onChange={onChange}
			placeholder={label}
			bottomSheetTitle={label}
			multiple
			snapPoints={[400]}
			snapPointsMode='constant'
		/>
	);
};
