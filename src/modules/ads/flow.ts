import { ParcelStepPage } from '@modules/delivery/creation/steps/ParcelStep.Page';
import { RouteStepPage } from '@modules/delivery/creation/steps/routeStep/RouteStep.Page';
import { StepMediaPick } from './StepMediaPick';

export enum CategoryType {
	delivery,
	buyAndDelivery,
	receive,
	askToBuy,
}

export interface StepItem {
	component: React.ComponentType;
}

export const getStepsByCategory = (category: CategoryType): StepItem[] => {
	const steps = stepsMap.get(category);

	if (!steps) {
		throw new Error(
			`Steps for category ${category} does not exists in stepsMap`,
		);
	}
	return steps;
};

type CategoryStepsMap = Map<CategoryType, StepItem[]>;
export const stepsMap: CategoryStepsMap = new Map();

stepsMap.set(CategoryType.delivery, [
	{ component: RouteStepPage },
	{ component: StepMediaPick },
	{ component: ParcelStepPage },
]);
