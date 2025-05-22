import { ChevronLeft, X } from '@tamagui/lucide-icons';
import { XStack, XStackProps } from 'tamagui';
import { NavButton } from './NavButton';

interface NavbarProps extends XStackProps {
	title?: React.ReactNode;
	showBackButton?: boolean;
	closable?: boolean;

	children?: React.ReactNode;
	left?: React.ReactNode;
	right?: React.ReactNode;

	onBack?: () => void;
	onClose?: () => void;
}

export const Navbar = ({
	showBackButton,
	closable,
	children,

	left,
	right,

	onBack,
	onClose,
	...props
}: NavbarProps) => {
	const BackButton = showBackButton !== false && onBack && (
		<NavButton
			onPress={onBack}
			Icon={ChevronLeft}
		/>
	);
	const CloseButton = closable !== false && onClose && (
		<NavButton
			onPress={onClose}
			Icon={X}
		/>
	);

	return (
		<XStack
			justify={'space-between'}
			items={'center'}
			px={12}
			bg={'$bg'}
			height={56}
			{...props}
		>
			<XStack
				width={80}
				justify='flex-start'
			>
				{left || BackButton}
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
				{right || CloseButton}
			</XStack>
		</XStack>
	);
};
