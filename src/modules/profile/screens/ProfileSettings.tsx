import { TextThemed } from '@/components/ui/TextThemed';
import { ModalLayout } from '@/layout/ScreenLayout/ModalLayout';
import { useRouter } from 'expo-router';

export const ProfileSettings = ({ route }) => {
	console.log(route);
	const router = useRouter();
	return (
		<ModalLayout onClose={() => router.dismissAll()}>
			<TextThemed>Profile settings</TextThemed>
		</ModalLayout>
	);
};
