import { ButtonStyled, TextThemed } from '@components/ui-kit';
import { AuthBottomSheet, AuthBottomSheetRef } from '@modals/AuthBottomSheet';
import { LockKeyhole } from '@tamagui/lucide-icons';
import { useRef } from 'react';
import { View, YStack } from 'tamagui';

interface AuthFallbackProps {
	description?: React.ReactNode;
	hideIcon?: boolean;
}

export const AuthFallback = ({
	description,
	hideIcon = false,
}: AuthFallbackProps) => {
	const authSheetRef = useRef<AuthBottomSheetRef>();

	const openModal = () => {
		console.log(authSheetRef.current);
		authSheetRef.current?.open();
	};

	return (
		<YStack
			flex={1}
			justify='center'
			items='center'
			gap={20}
			px={16}
		>
			{!hideIcon && (
				<View
					bg='$surfaceHover'
					width={80}
					height={80}
					rounded={40}
					justify='center'
					items='center'
				>
					<LockKeyhole
						size={40}
						color='$accent'
					/>
				</View>
			)}

			<YStack
				gap={8}
				items='center'
			>
				<TextThemed
					fontSize={20}
					fontWeight='600'
					text='center'
				>
					Доступ ограничен
				</TextThemed>

				{description && (
					<TextThemed
						fontSize={16}
						color='$textSecondary'
						text='center'
						maxW={320}
					>
						{description}
					</TextThemed>
				)}
			</YStack>

			<ButtonStyled
				variant='inverse'
				onPress={openModal}
				mt={10}
			>
				Войти или зарегистрироваться
			</ButtonStyled>
			<AuthBottomSheet ref={authSheetRef} />
		</YStack>
	);
};
