import { ScreenLayout, ScreenLayoutProps } from '@layout/ScreenLayout';
import { PropsWithChildren } from 'react';

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
