import { DeliveryInfo } from '@shared/interfaces';
import { DateRange, RouteSchema } from '@shared/schema';
import { isSameDay } from 'date-fns';

interface FilterOptions {
	route?: RouteSchema;
	dates?: DateRange;
}

const matched = (source1: string, source2: string) => {
	return source1.toLowerCase().includes(source2.toLowerCase());
};

export function filterDeliveries(
	deliveries: DeliveryInfo[],
	filters: FilterOptions,
): DeliveryInfo[] {
	const { route, dates } = filters;

	return deliveries.filter((delivery) => {
		const firstRoute = delivery.route[0];

		if (!firstRoute) {
			return false;
		}

		const matchesFromCity =
			route?.from?.city && matched(firstRoute.from.city, route.from.city);

		const matchesToCity = route?.to.city
			? matched(firstRoute.to.city, route.to.city)
			: true;

		const matchesFromDate = dates?.from
			? isSameDay(new Date(delivery.dates.from), new Date(dates.from))
			: true;

		const matchesToDate = dates?.to
			? isSameDay(new Date(delivery.dates.to), new Date(dates.to))
			: true;

		return matchesFromCity && matchesToCity && matchesFromDate && matchesToDate;
	});
}
