import { Input, styled } from 'tamagui';

export const InputThemed = styled(Input, {
	backgroundColor: '$inputBg',
	color: '$textPrimary',
	borderColor: '$inputBg',
	focusStyle: {
		borderColor: '$accent',
	},
});
