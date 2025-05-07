import { InputThemed } from '@components/ui-kit';
import { styled, TextArea } from 'tamagui';

export const TextareaThemed = styled(TextArea, {
	...InputThemed.staticConfig.defaultProps,
	rounded: 16,
	flex: 1,
	minH: 120,
});
