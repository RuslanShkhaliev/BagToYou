import { LogIn } from '@tamagui/lucide-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Header } from 'tamagui';

export const AppHeader = () => {
	const insets = useSafeAreaInsets();
	return (
		<Header
			backgroundColor="$bgContent"
			height={48 + insets.top}
			justifyContent="space-between"
			flexDirection="row"
			paddingTop={insets.top}
			paddingLeft={10}
		>
			<Button
				unstyled
				borderWidth={0}
				backgroundColor="transparent"
				color="$btnTextSecondary"
				alignItems="center"
				justifyContent="center"
				icon={LogIn}
				flexDirection="row"
			>
				Login
			</Button>
		</Header>
	);
};
