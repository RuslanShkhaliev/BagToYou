import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = () => {
	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const [keyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const onShow = (e: KeyboardEvent) => {
			setKeyboardVisible(true);
			setKeyboardHeight(e.endCoordinates.height);
		};
		const onHide = () => {
			setKeyboardVisible(false);
			setKeyboardHeight(0);
		};

		const showSub = Keyboard.addListener('keyboardDidShow', onShow);
		const hideSub = Keyboard.addListener('keyboardDidHide', onHide);

		return () => {
			showSub.remove();
			hideSub.remove();
		};
	}, []);

	return { keyboardHeight, keyboardVisible };
};
