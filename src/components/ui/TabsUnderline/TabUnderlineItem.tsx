import { useTabsUnderlineContext } from '@/components/ui/TabsUnderline/context';
import { View } from 'react-native';
import { GetProps, styled, ToggleGroup } from 'tamagui';

const StyledTab = styled(ToggleGroup.Item, {
	color: '$textSecondary',
	unstyled: true,
	py: 12,
	borderColor: 'transparent',
	borderWidth: 0,
	borderBottomEndRadius: 0,
	borderBottomLeftRadius: 0,
	bg: 'transparent',
	rounded: 0,
	variants: {
		count: {
			true: {
				pr: 20,
			},
		},
		active: {
			true: {
				color: '$textPrimary',
				rounded: 0,
			},
		},
	} as const,
});

export const TabUnderlineItem = ({
	children,
	value,
	...props
}: GetProps<typeof StyledTab>) => {
	const { activeTab, register } = useTabsUnderlineContext();

	return (
		<StyledTab
			ref={(el: View) => register(value, el)}
			value={value}
			active={activeTab === value}
			{...props}
		>
			{children}
		</StyledTab>
	);
};
