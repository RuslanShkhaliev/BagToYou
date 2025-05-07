import { TextThemed } from '@components/ui-kit';
import { LogIn } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import { Header, XStack } from 'tamagui';

export const AppHeader = () => {
	return (
		<Header
			height={48}
			justify='space-between'
			items={'center'}
			flexDirection='row'
			pl={10}
		>
			<Link href={'/login'}>
				<XStack
					gap={4}
					items={'center'}
				>
					<LogIn
						size={16}
						color={'$textPrimary'}
					/>
					<TextThemed>Login</TextThemed>
				</XStack>
			</Link>
		</Header>
	);
};
