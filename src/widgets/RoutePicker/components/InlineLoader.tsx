import React from 'react';
import { Spinner, Text, XStack, XStackProps } from 'tamagui';

interface InlineLoaderProps extends Omit<XStackProps, 'text'> {
	loading: boolean;
	text?: string;
}

export const InlineLoader = ({
	loading = false,
	text,
	...props
}: InlineLoaderProps) => {
	if (!loading) {
		return null;
	}
	return (
		<XStack
			gap={10}
			bg={'$inputBg'}
			rounded={16}
			px={16}
			height={38}
			items={'center'}
			{...props}
		>
			<Spinner size={'small'} />
			<Text
				fontSize={'$3'}
				color={'$textPrimary'}
			>
				{text ?? 'Searching locations...'}
			</Text>
		</XStack>
	);
};
