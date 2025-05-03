import { AppTitle } from '@/components/ui/AppTitle';
import { PropsWithChildren } from 'react';

export const PageTitle = ({ children }: PropsWithChildren) => {
	return (
		<AppTitle
			fontSize={14}
			fontWeight={700}
			color={'$white'}
		>
			{children}
		</AppTitle>
	);
};
