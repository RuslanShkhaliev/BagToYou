import { InputField, TextThemed } from '@components/ui-kit';
import { BottomSheet } from '@modals/BottomSheet';
import { MessengerType } from '@shared/enums';
import { Check } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { ListItem, View, YGroup } from 'tamagui';

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
	const [isOpen, setIsOpen] = useState(false);

	const displayValue = selected.length ? selected.join(', ') : label;

	const handleToggle = () => setIsOpen(!isOpen);
	const handleSelect = (messenger: MessengerType) => {
		if (selected.includes(messenger)) {
			const newSelected = selected.filter((m) => m !== messenger);

			if (newSelected.length === 0) return;
			onChange?.(newSelected);
		} else {
			onChange?.([...selected, messenger]);
		}
	};
	return (
		<View>
			<InputField
				rounded={10}
				value={displayValue}
				readOnly
				onPress={handleToggle}
			/>
			<BottomSheet
				open={isOpen}
				onOpenChange={setIsOpen}
				snapPoints={[400, 0]}
				snapPointsMode='constant'
				title={
					<TextThemed
						fontWeight={600}
						fontSize={20}
					>
						{label}
					</TextThemed>
				}
			>
				<YGroup pt={'$4'}>
					{Object.values(MessengerType).map((social) => (
						<YGroup.Item key={social}>
							<ListItem
								iconAfter={
									selected.includes(social) ? (
										<View
											p={4}
											bg={'$accent'}
											rounded='$12'
										>
											<Check size={16} />
										</View>
									) : undefined
								}
								onPress={() => handleSelect(social)}
							>
								<TextThemed fontSize={18}>{social}</TextThemed>
							</ListItem>
						</YGroup.Item>
					))}
				</YGroup>
			</BottomSheet>
		</View>
	);
};
