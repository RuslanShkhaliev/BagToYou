import { useState } from 'react';

export const useModalControls = (initialValue = false) => {
	const [visible, setVisible] = useState(initialValue);

	const open = () => setVisible(true);
	const close = () => setVisible(false);

	return {
		visible,
		open,
		close,
	};
};


export interface ModalRef {
	open: () => void;
	close: () => void;
}
