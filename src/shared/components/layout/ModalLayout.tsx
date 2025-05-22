import {
	LayoutScreen,
	LayoutScreenProps,
} from '@components/layout/LayoutScreen';
import { PropsWithChildren } from 'react';

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
