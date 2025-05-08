import { ParcelStep } from '@modules/delivery/creation/parcel.step';
import { RouteStep } from '@modules/delivery/creation/route.step';
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
	{ component: RouteStep },
	{ component: StepMediaPick },
	{ component: ParcelStep },
]);
