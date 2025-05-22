import { PropsWithChildren } from 'react';
import {
	LayoutScreen,
	LayoutScreenProps,
} from 'src/shared/components/layout/LayoutScreen';

export type ModalLayoutProps = Omit<LayoutScreenProps, 'modal'>;

export const ModalLayout = (props: PropsWithChildren<ModalLayoutProps>) => {
	return (
		<LayoutScreen
			modalView
			{...props}
		>
			{props.children}
		</LayoutScreen>
	);
};
