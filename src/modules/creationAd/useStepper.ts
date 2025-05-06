import { StepItem } from '@/modules/creationAd/flow';
import { useState } from 'react';

interface UseStepperProps {
	initialStep: number;
	steps: StepItem[];
}

export const useStepper = ({
	initialStep = 0,
	steps = [],
}: UseStepperProps) => {
	const [currentIndex, setCurrentIndex] = useState(initialStep);
	const step = steps[currentIndex];

	const nextStep = () =>
		setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
	const prevStep = () => setCurrentIndex((i) => Math.max(i - 1, 0));
	const goToStep = (step: number) => setCurrentIndex(step);
	const reset = () => goToStep(0);

	return {
		currentIndex,
		step,
		component: step.component,
		totalSteps: steps.length,
		isFirstStep: currentIndex === 0,
		isLastStep: currentIndex === steps.length - 1,
		goToStep,
		nextStep,
		prevStep,
		reset,
	};
};
