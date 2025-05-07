import { useState } from 'react';

export const useToggle = (
	initialValue = false,
): [boolean, (val?: boolean) => void] => {
	const [value, setValue] = useState(initialValue);

	const toggle = (val?: boolean) => {
		setValue(() => {
			if (typeof val !== 'undefined') {
				return val;
			}

			return !value;
		});
	};

	return [value, toggle];
};
