import { InputField, TextThemed } from '@components/ui-kit';
import { BottomSheet } from '@modals/BottomSheet';
import { MessengerType } from '@shared/enums';
import { Check } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { ListItem, View, YGroup } from 'tamagui';

interface SocialSelectorProps {
	selected: MessengerType[];
	onChange: (social: MessengerType[]) => void;
}
export const SocialSelector = ({
	selected = [MessengerType.fb],
	onChange,
}: SocialSelectorProps) => {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
	};
	const onSelect = (social: MessengerType) => {
		if (selected.includes(social)) {
			const newSelected = selected.filter((s) => s !== social);

			if (newSelected.length === 0) return;
			onChange?.(newSelected);
		} else {
			onChange?.([...selected, social]);
		}
	};
	return (
		<View>
			<InputField
				rounded={10}
				value={selected.join(', ')}
				readOnly
				onPress={toggle}
			/>
			<BottomSheet
				open={open}
				onOpenChange={setOpen}
				snapPoints={[400, 0]}
				snapPointsMode='constant'
				title={
					<TextThemed
						fontWeight={600}
						fontSize={20}
					>
						Выберите мессенджер
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
								onPress={() => onSelect(social)}
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
