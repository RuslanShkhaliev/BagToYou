import { InputThemed } from '@/components/ui/Inputs';
import { styled, TextArea } from 'tamagui';

export const TextareaThemed = styled(TextArea, {
	...InputThemed.staticConfig.defaultProps,
	rounded: 16,
	minH: 100,
});
