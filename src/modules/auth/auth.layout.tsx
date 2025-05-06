import React from 'react';
import { Card, H4, Paragraph, View } from 'tamagui';

interface AuthLayoutProps {
	title: React.ReactNode;
	description: React.ReactNode;
	children: React.ReactNode;
	footer: React.ReactNode;
}
export const AuthLayout = ({
	children,
	title,
	description,
	footer,
}: AuthLayoutProps) => {
	return (
		<View
			bg={'$bg'}
			flex={1}
			pt={30}
			px={12}
		>
			<Card bg={'$bgCard'}>
				<Card.Header>
					<H4 color={'$textPrimary'}>{title}</H4>
					<Paragraph color={'$textSecondary'}>{description}</Paragraph>
				</Card.Header>
				{children}
				<Card.Footer
					mt={20}
					py={10}
				>
					{footer}
				</Card.Footer>
			</Card>
		</View>
	);
};
