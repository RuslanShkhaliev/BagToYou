import { Surface } from '@components/Surface';
import { TextThemed } from '@components/ui-kit';
import { PropsWithChildren } from 'react';

interface EmptyStateProps extends PropsWithChildren {
	title?: string;
	description?: string;
}

export const EmptyState = ({
	title,
	description,
	children,
}: EmptyStateProps) => {
	return (
		<Surface>
			<TextThemed
				text={'center'}
				fontSize={16}
			>
				{title ?? 'No results founds'}
			</TextThemed>
			{children ??
				(description && <TextThemed fontSize={12}>{description}</TextThemed>)}
		</Surface>
	);
};
