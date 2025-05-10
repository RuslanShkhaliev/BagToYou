import { TextThemed } from '@components/ui-kit/TextThemed';

export const ErrorMessage = ({ message }: { message?: string }) => {
	if (!message) return null;
	return (
		<TextThemed
			color={'$error'}
			fontSize={14}
		>
			{message}
		</TextThemed>
	);
};
