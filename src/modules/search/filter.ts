import { DeliveryInfo } from '@shared/interfaces';
import { DateRangeSchema } from '@shared/schema/date';
import { RouteBaseSchema } from '@shared/schema/location';
import { isSameDay } from 'date-fns';

interface FilterOptions {
	route?: RouteBaseSchema;
	dates?: DateRangeSchema;
}

// Безопасное сравнение городов
const cityMatches = (city1?: string, city2?: string): boolean => {
	if (!city1 || !city2) return false;
	return city1.toLowerCase().includes(city2.toLowerCase());
};

export function filterDeliveries(
	deliveries: DeliveryInfo[],
	filters: FilterOptions,
): DeliveryInfo[] {
	const { route, dates } = filters;

	return deliveries.filter((delivery) => {
		const firstRoute = delivery.route[0];
		if (!firstRoute) return false;

		// Проверка города отправления
		let matchesFromCity = true;
		if (route?.from?.city) {
			matchesFromCity = cityMatches(
				firstRoute.from?.city,
				route.from.city,
			);
		}

		// Проверка города назначения
		let matchesToCity = true;
		if (route?.destination?.city) {
			matchesToCity = cityMatches(
				firstRoute.destination?.city,
				route.destination.city,
			);
		}

		// Проверка дат
		const matchesFromDate =
			!dates?.from ||
			isSameDay(
				new Date(delivery.dates.from || ''),
				new Date(dates.from),
			);

		const matchesToDate =
			!dates?.to ||
			isSameDay(new Date(delivery.dates.to || ''), new Date(dates.to));

		return (
			matchesFromCity && matchesToCity && matchesFromDate && matchesToDate
		);
	});
}
