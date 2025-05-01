import {
	createMediaPicker,
	CreateMediaPickerProps,
} from '@/lib/createMediaPicker';
import { useState } from 'react';

export const useMediaPicker = (props: CreateMediaPickerProps) => {
	const [loading, setLoading] = useState(false);
	const mediaPicker = createMediaPicker(props);

	const pick = async () => {
		try {
			setLoading(true);
			return await mediaPicker.pick();
		} finally {
			setLoading(false);
		}
	};
	return {
		loading,
		pick,
	};
};
