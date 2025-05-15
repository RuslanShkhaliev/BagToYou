import { styled } from 'tamagui';
import { TextThemed } from './TextThemed';

/**
 * Компоненты заголовков с различными размерами и стилями.
 * Используются для заголовков в Navbar, секций в форме и других элементов интерфейса.
 *
 * Примеры использования:
 * ```tsx
 * <Heading.H1>Главный заголовок</Heading.H1>
 * <Heading.H4 color="$textSecondary">Подзаголовок секции</Heading.H4>
 * <Heading.H3 fontWeight="700">Важный заголовок</Heading.H3>
 * ```
 */

/**
 * H1 - Используется для главных заголовков страниц
 */
export const H1 = styled(TextThemed, {
	name: 'H1',
	fontSize: 28,
	lineHeight: 34,
	fontWeight: '700',
});

/**
 * H2 - Используется для заголовков разделов
 */
export const H2 = styled(TextThemed, {
	name: 'H2',
	fontSize: 24,
	lineHeight: 30,
	fontWeight: '700',
});

/**
 * H3 - Используется для заголовков подразделов и в Navbar
 */
export const H3 = styled(TextThemed, {
	name: 'H3',
	fontSize: 20,
	lineHeight: 26,
	fontWeight: '600',
});

/**
 * H4 - Используется для заголовков элементов или секций в форме
 */
export const H4 = styled(TextThemed, {
	name: 'H4',
	fontSize: 18,
	lineHeight: 24,
	fontWeight: '500',
});

/**
 * H5 - Используется для небольших заголовков и лейблов
 */
export const H5 = styled(TextThemed, {
	name: 'H5',
	fontSize: 16,
	lineHeight: 22,
	fontWeight: '500',
});

/**
 * H6 - Используется для самых маленьких заголовков
 */
export const H6 = styled(TextThemed, {
	name: 'H6',
	fontSize: 14,
	lineHeight: 20,
	fontWeight: '400',
});

/**
 * Компоненты заголовков с различными размерами и стилями.
 * Используются для заголовков в Navbar, секций в форме и других элементов интерфейса.
 *
 * Примеры использования:
 * ```tsx
 * <Heading.H1>Главный заголовок</Heading.H1>
 * <Heading.H4 color="$textSecondary">Подзаголовок секции</Heading.H4>
 * <Heading.H3 fontWeight="700">Важный заголовок</Heading.H3>
 * ```
 */
export const Heading = {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
};
