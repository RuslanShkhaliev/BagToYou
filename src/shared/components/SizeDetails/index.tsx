import { Heading } from '@components/ui-kit';
import { XStack, YStack } from 'tamagui';

export const SizeDetails = () => {
	return (
		<YStack
			gap={16}
			mb={24}
		>
			<Heading.H3>Информация о посылке</Heading.H3>

			<XStack
				flexWrap='wrap'
				gap={12}
			 />
		</YStack>
	);
};
