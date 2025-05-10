import { PropsWithChildren } from 'react';
import { ScreenLayout, ScreenLayoutProps } from './ScreenLayout';

export type ModalLayoutProps = Omit<ScreenLayoutProps, 'modal'>;

export const ModalLayout = (props: PropsWithChildren<ModalLayoutProps>) => {
	return (
		<ScreenLayout
			modal
			{...props}
		>
			{props.children}
		</ScreenLayout>
	);
};
