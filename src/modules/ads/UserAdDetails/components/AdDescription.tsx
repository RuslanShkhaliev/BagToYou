import { Heading, TextThemed } from '@components/ui-kit';
import { PropsWithChildren } from 'react';
import { View, YStack } from 'tamagui';

export const AdDescription = ({ children }: PropsWithChildren) => {
	return (
		<YStack
			gap={8}
			mb={24}
			px={10}
		>
			<Heading.H3>Описание</Heading.H3>
			<View
				bg='$surfaceHover'
				px={16}
				py={12}
				rounded={8}
				minH={80}
			>
				<TextThemed>{children}</TextThemed>
			</View>
		</YStack>
	);
};
