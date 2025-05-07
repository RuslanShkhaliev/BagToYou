import { ChevronLeft, X } from '@tamagui/lucide-icons';
import { PropsWithChildren } from 'react';
import { Button, styled, XStack, XStackProps } from 'tamagui';

interface NavbarProps extends XStackProps {
	onBack?: () => void;
	onClose?: () => void;
	left?: React.ReactNode;
	right?: React.ReactNode;
	title?: React.ReactNode;
}

export const Navbar = ({
	onBack,
	onClose,
	children,
	left,
	right,
	...props
}: PropsWithChildren<NavbarProps>) => {
	const ButtonBack = onBack && (
		<NavButton
			group
			onPress={onBack}
			icon={
				<ChevronLeft
					size={30}
					shrink={0}
					color={'$textPrimary'}
					$group-press={{
						color: '$textSecondary',
					}}
				/>
			}
		/>
	);

	const ButtonClose = onClose && (
		<NavButton onPress={onClose}>
			<X
				shrink={0}
				size={30}
				color={'$textPrimary'}
				$group-press={{
					color: '$textSecondary',
				}}
			/>
		</NavButton>
	);

	return (
		<XStack
			justify={'space-between'}
			items={'center'}
			px={12}
			{...props}
		>
			<XStack
				minW={60}
				justify={'flex-start'}
				items={'center'}
			>
				{left ?? ButtonBack}
			</XStack>
			<XStack
				flex={2}
				justify={'center'}
			>
				{children}
			</XStack>
			<XStack
				minW={60}
				items={'center'}
				justify={'flex-end'}
			>
				{right ?? ButtonClose}
			</XStack>
		</XStack>
	);
};

export const NavButton = styled(Button, {
	width: 40,
	height: 40,
	justify: 'center',
	items: 'center',
	bg: 'transparent',
	pressStyle: {
		bg: '$tabBg',
	},
});
