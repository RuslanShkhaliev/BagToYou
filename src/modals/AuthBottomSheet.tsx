import { ButtonLink, TextThemed } from '@components/ui-kit';
import { BottomSheet } from '@modals/BottomSheet';
import { ROUTES } from '@shared/constants/routes';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { YStack } from 'tamagui';

export interface AuthBottomSheetRef {
	open: () => void;
	close: () => void;
}

export const AuthBottomSheet = forwardRef<AuthBottomSheetRef>((_, ref) => {
	const [isOpen, setIsOpen] = useState(false);

	console.log({ isOpen });

	useImperativeHandle(ref, () => ({
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
	}));
	return (
		<BottomSheet
			open={isOpen}
			onOpenChange={setIsOpen}
			snapPoints={[350]}
			snapPointsMode='constant'
			scroll={false}
			closable={false}
		>
			<YStack
				gap={16}
				px={16}
				py={8}
			>
				<ButtonLink
					href={ROUTES.LOGIN}
					variant='inverse'
					height={56}
				>
					Войти через телефон или почту
				</ButtonLink>

				<ButtonLink
					href={ROUTES.REGISTER}
					variant='outlined'
					height={56}
				>
					Зарегистрироваться
				</ButtonLink>

				<TextThemed
					fontSize={14}
					color='$textSecondary'
					text='center'
					px={16}
				>
					При регистрации и входе вы соглашаетесь с{' '}
					<TextThemed
						fontSize={14}
						color='$textSecondary'
						textDecorationLine='underline'
					>
						условиями использования BagToYou и политикой
						конфиденциальности.
					</TextThemed>
				</TextThemed>
			</YStack>
		</BottomSheet>
	);
});
