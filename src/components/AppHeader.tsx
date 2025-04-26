import { LogIn } from '@tamagui/lucide-icons';
import { Button, Header } from 'tamagui';

export const AppHeader = () => {
	return (
		<Header
			backgroundColor="$bgContent"
			height={48}
			justifyContent="space-between"
			flexDirection="row"
		>
			<Button
				unstyled
				borderWidth="0"
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
