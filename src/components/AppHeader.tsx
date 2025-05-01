import { LogIn } from '@tamagui/lucide-icons';
import { Button, Header } from 'tamagui';

export const AppHeader = () => {
	return (
		<Header
			height={48}
			justify="space-between"
			flexDirection="row"
			pl={10}
		>
			<Button
				unstyled
				borderWidth={0}
				bg="transparent"
				color="$btnText"
				items="center"
				justify="center"
				icon={LogIn}
				flexDirection="row"
			>
				Login
			</Button>
		</Header>
	);
};
