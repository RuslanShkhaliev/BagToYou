import { Surface } from '@components/Surface';
import { Heading } from '@components/ui-kit';
import { View, ViewProps } from 'tamagui';

interface RouteDetailsLayoutProps extends ViewProps {
	title?: string;
	children: React.ReactNode;
}

export const DetailsLayout = ({
	children,
	title = 'Маршрут',
	...props
}: RouteDetailsLayoutProps) => {
	return (
		<View gap={16}>
			<Heading.H3 px={10}>{title}</Heading.H3>
			<Surface
				p={12}
				gap={20}
				{...props}
			>
				{children}
			</Surface>
		</View>
	);
};
