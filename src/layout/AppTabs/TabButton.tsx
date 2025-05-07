import { IconProps } from '@tamagui/helpers-icon';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef, NamedExoticComponent } from 'react';
import { Pressable, View } from 'react-native';
import { Text, YStack } from 'tamagui';

interface TabButtonProps extends TabTriggerSlotProps {
	IconComponent: NamedExoticComponent<IconProps>;
}

export const TabButton = forwardRef<View, TabButtonProps>(
	({ IconComponent, children, isFocused, ...props }, ref) => {
		return (
			<Pressable
				{...props}
				ref={ref}
				style={[
					{
						display: 'flex',
						flex: 1,
						alignItems: 'center',
						flexDirection: 'column',
						gap: 10,
						padding: 5,
					},
				]}
			>
				<IconComponent
					size={22}
					color={isFocused ? '$textPrimary' : '$textSecondary'}
				/>
				<YStack>
					<Text
						fontSize={9}
						color={isFocused ? '$textPrimary' : '$textSecondary'}
					>
						{children}
					</Text>
				</YStack>
			</Pressable>
		);
	},
);
