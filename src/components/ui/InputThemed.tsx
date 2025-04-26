import { Input, styled } from 'tamagui';

export const InputThemed = styled(Input, {
	cursor: 'pointer',
	backgroundColor: '$inputBg',
	color: '$textPrimary',
	borderColor: '$inputBg',
	focusStyle: {
		borderColor: '$orange500', // или другой токен цвета
	},
});
