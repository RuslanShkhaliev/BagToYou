import { addMonths, format, intervalToDuration, isValid } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';

export interface AdLifecycleOptions {
	/**
	 * Дата создания объявления (строка или объект Date)
	 */
	createdAt: Timestamp;
	/**
	 * Срок действия объявления в месяцах (по умолчанию 1 месяц)
	 */
	expirationMonths?: number;
	/**
	 * Формат отображения даты создания
	 */
	dateFormat?: string;
}

export interface AdLifecycleResult {
	/**
	 * Количество дней до истечения срока действия
	 */
	daysLeft: number;
	/**
	 * Дата истечения срока действия
	 */
	expirationDate: Date;
	/**
	 * Отформатированная дата создания
	 */
	formattedCreationDate: string;
	/**
	 * Отформатированная дата истечения срока
	 */
	formattedExpirationDate: string;
	/**
	 * Статус объявления (активно/истекает/истекло)
	 */
	status: 'active' | 'expiring' | 'expired';
	/**
	 * Процент оставшегося времени (от 0 до 100)
	 */
	timeLeftPercent: number;
}

/**
 * Хук для работы с жизненным циклом объявления
 * Возвращает информацию о сроках действия, форматированные даты и статус
 */
export const getAdMetadata = ({
	createdAt,
	expirationMonths = 1,
	dateFormat = 'd MMM, HH:mm',
}: AdLifecycleOptions): AdLifecycleResult => {
	const creationDate = createdAt.toDate();

	if (!isValid(creationDate)) {
		console.log(creationDate, 'to date');
		throw new Error('Некорректная дата создания объявления');
	}

	const now = new Date();
	const expirationDate = addMonths(creationDate, expirationMonths);

	const duration = intervalToDuration({
		start: now,
		end: expirationDate,
	});

	const daysLeft = duration.days || 0;

	let status: 'active' | 'expiring' | 'expired';
	if (now > expirationDate) {
		status = 'expired';
	} else if (daysLeft <= 7) {
		status = 'expiring';
	} else {
		status = 'active';
	}

	const totalDuration = intervalToDuration({
		start: creationDate,
		end: expirationDate,
	});

	const totalDays =
		(totalDuration.months || 0) * 30 + (totalDuration.days || 0);
	const elapsedDuration = intervalToDuration({
		start: creationDate,
		end: now,
	});
	const elapsedDays =
		(elapsedDuration.months || 0) * 30 + (elapsedDuration.days || 0);

	const timeLeftPercent = Math.max(
		0,
		Math.min(100, 100 - (elapsedDays / totalDays) * 100),
	);

	return {
		daysLeft,
		expirationDate,
		formattedCreationDate: format(creationDate, dateFormat, { locale: ru }),
		formattedExpirationDate: format(expirationDate, dateFormat, {
			locale: ru,
		}),
		status,
		timeLeftPercent,
	};
};
