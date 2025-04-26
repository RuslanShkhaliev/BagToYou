import { Input, Label, Text, YStack } from 'tamagui';

export const NewRequestDeliveryScreen = () => {
	return (
		<YStack>
			<YStack gap="4px">
				<Label>Условия перевозки</Label>
				<Text>здесь вы можете указать объем и тип товара</Text>
				<Input />
			</YStack>
			<YStack>
				<Label>Укажите вознаграждение</Label>
				<Input />
			</YStack>
		</YStack>
	);
};
