import { ButtonStyled } from '@/components/ui/buttons/ButtonStyled';
import { ScreenLayout } from '@/layout/ScreenLayout/ScreenLayout';
import { AdCreationProvider } from '@/modules/creationAd/context';
import { CategoryType, getStepsByCategory } from '@/modules/creationAd/flow';
import { useStepper } from '@/modules/creationAd/useStepper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'tamagui';

interface StepperProps {
	category: CategoryType;
}

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
