import { TextThemed } from '@components/ui-kit';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Navbar } from './Navbar';

interface UseCustomHeaderProps {
	closable?: boolean;
	title?: React.ReactNode;
	left?: React.ReactNode;
	right?: React.ReactNode;
	showBackButton?: boolean;
	onClose?: () => void;
	onBack?: () => void;
}

export const useNavbar = ({
	title,
	closable = false,
	showBackButton,
	onClose,
	onBack,
	left,
	right,
}: UseCustomHeaderProps) => {
	const navigation = useNavigation();

	const handleBack = useCallback(() => {
		if (onBack) {
			return onBack?.();
		}
		navigation.goBack();
	}, [onBack, navigation.goBack]);

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => (
				<Navbar
					showBackButton={showBackButton ?? navigation.canGoBack()}
					closable={closable}
					left={left}
					right={right}
					title={title}
					onBack={handleBack}
					onClose={onClose}
				>
					<TextThemed
						fontSize={18}
						fontWeight={600}
						text='center'
					>
						{title}
					</TextThemed>
				</Navbar>
			),
		});
	}, [navigation, left, right, title]);

	return navigation;
};
