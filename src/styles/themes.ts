import { tokens } from '@/styles/tokens';

export const dark = {
	// === Базовые цвета ===
	bg: tokens.color.graphite900,
	bgContent: tokens.color.graphite700,
	bgCard: tokens.color.graphite800,
	bgTransparent: 'rgba(0, 0, 0, 0.5)',

	// === Акценты ===
	accent: tokens.color.blue800,
	accentHover: tokens.color.blue500,
	accentPress: tokens.color.blue300,
	accentFocus: tokens.color.blue500,

	error: tokens.color.red800,

	// === Текст ===
	textPrimary: tokens.color.graphite50,
	textSecondary: tokens.color.graphite300,
	textInverted: tokens.color.white,
	textMuted: tokens.color.white60,
	textDisabled: tokens.color.white24,

	// === Input ===
	inputBg: tokens.color.graphite600,
	inputPlaceholder: tokens.color.graphite300,
	inputText: tokens.color.graphite50,
	inputBorder: tokens.color.graphite400,
	inputFocusBorder: tokens.color.blue800,

	// === Outline ===
	outlineColor: tokens.color.blue800,
	outlineWidth: 2,

	// === Buttons ===
	btnBg: tokens.color.graphite800,
	btnBgHover: tokens.color.graphite700,
	btnBgPress: tokens.color.graphite600,
	btnBgFocus: tokens.color.graphite700,
	btnText: tokens.color.graphite50,

	btnAccentBg: tokens.color.blue800,
	btnAccentBgHover: tokens.color.blue500,
	btnAccentBgPress: tokens.color.blue300,
	btnAccentText: tokens.color.white,

	// === Tabs ===
	tabBg: tokens.color.graphite700,
	tabBgActive: tokens.color.white16,
	tabText: tokens.color.graphite300,
	tabTextActive: tokens.color.graphite50,

	// === Borders and Separators ===
	borderColor: tokens.color.graphite400,
	separatorColor: tokens.color.ink300,

	// === Hover/Press (общие для interactive surface) ===
	surfaceHover: tokens.color.white8,
	surfacePress: tokens.color.white12,
	surfaceFocus: tokens.color.white16,

	// === Shadows (использовать с shadowColor) ===
	shadowColor: tokens.color.black95,

	// === Z-index ===
	zIndexModal: 100000,

	// === Отступы ===
	spacingXs: 4,
	spacingSm: 8,
	spacingMd: 12,
	spacingLg: 16,
	spacingXl: 24,
	spacing2xl: 32,
};

type Theme = typeof dark;

export const themes = {
	dark,
	light: dark,
} satisfies Record<string, Theme>;

