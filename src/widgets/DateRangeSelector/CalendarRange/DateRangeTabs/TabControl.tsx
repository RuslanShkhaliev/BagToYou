import { ToggleGroupItem } from '@components/ToggleGroupItem';
import { ButtonStyled, TextThemed } from '@components/ui-kit';
import { X } from '@tamagui/lucide-icons';
import { View } from 'tamagui';

interface TabControlProps {
	active: boolean;
	label?: string;
	onClear?: () => void;
	value: string;
	defaultLabel?: string;
}

export const TabControl = ({
	active,
	value,
	label,
	onClear,
	defaultLabel,
}: TabControlProps) => {
	const displayLabel = label || defaultLabel;
	const isClearable = Boolean(label && onClear);
	return (
		<ToggleGroupItem
			flex={1}
			shrink={0}
			width={'50%'}
			active={active}
			value={value}
			height={60}
			position='relative'
			items='flex-start'
		>
			<TextThemed
				fontSize={18}
				color={'$textPrimary'}
			>
				{displayLabel}
			</TextThemed>
			{isClearable && (
				<View
					position='absolute'
					r={0}
					t={0}
					b={0}
					pr={10}
					justify='center'
					items='center'
				>
					<ButtonStyled
						onPress={onClear}
						icon={
							<X
								color={'$orange500'}
								size={24}
							/>
						}
						variant={'ghost'}
					/>
				</View>
			)}
		</ToggleGroupItem>
	);
};
