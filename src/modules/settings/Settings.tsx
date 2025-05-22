import { LayoutScreen } from '@components/layout';
import { Surface } from '@components/Surface';
import { ButtonStyled } from '@components/ui-kit';
import { useRouter } from 'expo-router';

export const SettingsScreen = () => {
	const router = useRouter();

	const open = () => {
		router.push('/profile');
	};
	return (
		<LayoutScreen>
			<Surface>
				<ButtonStyled onPress={open}>Мой профиль</ButtonStyled>
			</Surface>
		</LayoutScreen>
	);
};
