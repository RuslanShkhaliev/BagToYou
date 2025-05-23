import { LayoutScreen } from '@components/layout';
import { TextThemed } from '@components/ui-kit';
import { useRouter } from 'expo-router';

export const ProfileSettings = () => {
	const router = useRouter();
	return (
		<LayoutScreen>
			<TextThemed>Profile settings</TextThemed>
		</LayoutScreen>
	);
};
