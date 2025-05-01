import { styled, View } from 'tamagui';

export const Surface = styled(View, {
	name: 'Surface',
	bg: '$bgCard',
	shadowColor: '$shadowColor',
	shadowOffset: { width: 0, height: 4 },
	shadowOpacity: 0.1,
	shadowRadius: 10,
	px: 12,
	py: 15,
	rounded: '$4',
});
