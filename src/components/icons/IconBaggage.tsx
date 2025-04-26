import type { IconProps } from '@tamagui/helpers-icon';
import { themed } from '@tamagui/helpers-icon';
import type { NamedExoticComponent } from 'react';
import { memo } from 'react';
import { G, Path, Rect, Svg } from 'react-native-svg';

interface Props extends IconProps {
	color: string;
	size: number;
}
const Icon = (props: Props) => {
	const { color = 'black', size = 24, ...otherProps } = props;
	return (
		<Svg
			fill={color}
			viewBox="0 0 32 32"
			stroke="none"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit={10}
			width={size}
			height={size}
			{...otherProps}
		>
			<G>
				<Path
					d="M28,13h-1V2c0.6,0,1-0.4,1-1s-0.4-1-1-1h-1h-6h-1c-0.6,0-1,0.4-1,1s0.4,1,1,1v11h-1c-1.7,0-3,1.3-3,3v3h16v-3
		C31,14.3,29.7,13,28,13z M21,2h4v11h-4V2z"
				/>
				<Path d="M15,29c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-8H15V29z" />
				<Path d="M0,20v9c0,1.7,1.3,3,3,3h2V17H3C1.3,17,0,18.3,0,20z" />
				<Rect x="7" y="17" width="6" height="15" />
				<Path d="M12,11H8c-0.6,0-1,0.4-1,1v3h2v-2h2v2h2v-3C13,11.4,12.6,11,12,11z" />
			</G>
		</Svg>
	);
};

Icon.displayName = 'IconBaggage';

export const IconBaggage: NamedExoticComponent<IconProps> = memo<IconProps>(themed(Icon));
