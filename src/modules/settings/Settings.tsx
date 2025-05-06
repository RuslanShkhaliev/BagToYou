import { ButtonStyled } from '@/components/ui/buttons/ButtonStyled';
import { PageTitle } from '@/components/ui/PageTitle';
import { Surface } from '@/components/ui/Surface';
import { ScreenLayout } from '@/layout/ScreenLayout/ScreenLayout';
import { useRouter } from 'expo-router';

export const Settings = () => {
	const router = useRouter();
	const open = () => {
		router.push('/profile', {
			name: 'profile',
			params: {
				onClose: open,
			},
		});
	};
	return (
		<ScreenLayout title={<PageTitle>Настройки</PageTitle>}>
			<Surface>
				<ButtonStyled onPress={open}>Мой профиль</ButtonStyled>
			</Surface>
		</ScreenLayout>
	);
};
