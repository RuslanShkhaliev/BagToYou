import { ScreenLayout } from '@components/layout';
import { Surface } from '@components/Surface';
import { ButtonStyled, PageTitle } from '@components/ui-kit';
import { useRouter } from 'expo-router';

export const SettingsScreen = () => {
	const router = useRouter();

	const open = () => {
		router.push('/profile');
	};
	return (
		<ScreenLayout title={<PageTitle>Настройки</PageTitle>}>
			<Surface>
				<ButtonStyled onPress={open}>Мой профиль</ButtonStyled>
			</Surface>
		</ScreenLayout>
	);
};
