import { ButtonStyled } from '@components/ui-kit';
import { ScreenLayout } from '@layout/ScreenLayout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'tamagui';
import { AdCreationProvider } from './context';
import { getStepsByCategory } from './flow';
import { useStepper } from './useStepper';

export const StepperLayout = () => {
	const { category } = useLocalSearchParams<{ category: string }>();

	const steps = getStepsByCategory(Number(category));

	const {
		component: Component,
		isFirstStep,
		isLastStep,
		nextStep,
		prevStep,
	} = useStepper({
		initialStep: 0,
		steps,
	});

	const router = useRouter();

	const cancelSteps = () => {
		router.replace('/ads');
	};

	return (
		<AdCreationProvider>
			<ScreenLayout
				hideHeader
				bodyProps={{
					px: 0,
				}}
				withoutTabBarOffset
				onBack={isFirstStep ? () => router.replace('../') : prevStep}
				right={
					<ButtonStyled
						variant={'ghost'}
						onPress={cancelSteps}
					>
						Сохранить и выйти
					</ButtonStyled>
				}
				stickyAction={
					isLastStep ? (
						<ButtonStyled>Опубликовать</ButtonStyled>
					) : (
						<ButtonStyled onPress={nextStep}>Продолжить</ButtonStyled>
					)
				}
			>
				<View
					pt={10}
					flex={1}
				>
					<Component />
				</View>
			</ScreenLayout>
		</AdCreationProvider>
	);
};
