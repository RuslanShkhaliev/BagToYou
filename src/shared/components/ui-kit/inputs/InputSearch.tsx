import { InputField, InputFieldProps } from '@components/ui-kit';
import { Search } from '@tamagui/lucide-icons';

export const InputSearch = (props: InputFieldProps) => {
	return (
		<InputField
			{...props}
			icon={
				<Search
					size={20}
					color='$graphite300'
					$group-focusWithin={{
						color: '$textPrimary',
					}}
				/>
			}
		/>
	);
};
