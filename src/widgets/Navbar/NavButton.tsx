import { ButtonStyled } from '@components/ui-kit';
import { IconProps } from '@tamagui/helpers-icon';
import { NamedExoticComponent } from 'react';

interface NavButtonProps {
	Icon: NamedExoticComponent<IconProps>;
	onPress?: () => void;
}

export const NavButton = ({ Icon, onPress }: NavButtonProps) => {
	return (
		<ButtonStyled
			variant={'ghost'}
			width={40}
			height={40}
			icon={
				<Icon
					size={30}
					shrink={0}
					color={'$textPrimary'}
				/>
			}
			onPress={onPress}
		/>
	);
};
