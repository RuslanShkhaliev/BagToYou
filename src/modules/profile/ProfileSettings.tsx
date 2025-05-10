import { ModalLayout } from '@components/layout';
import { TextThemed } from '@components/ui-kit';
import { useRouter } from 'expo-router';

export const ProfileSettings = () => {
	const router = useRouter();
	return (
		<ModalLayout onClose={() => router.dismissAll()}>
			<TextThemed>Profile settings</TextThemed>
		</ModalLayout>
	);
};
