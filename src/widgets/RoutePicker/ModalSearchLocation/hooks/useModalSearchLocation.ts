import { Ref, useRef, useState } from 'react';

import { RouteTargetType } from '@widgets/RoutePicker/types';
import { useCallback } from 'react';

import { useImperativeHandle } from 'react';
import { ModalWrapperRef } from '../ModalSearchLocation';

export const useModalSearch = () => {
	const modalRef = useRef<ModalWrapperRef>(null);

	return {
		modalRef,
		open: (target?: RouteTargetType) =>
			modalRef.current?.open(target || RouteTargetType.To),
		close: () => modalRef.current?.close(),
	};
};

export const useDefineSearchModal = (
	ref: Ref<ModalWrapperRef>,
	onOpen: (target: RouteTargetType) => void,
) => {
	const [visible, setVisible] = useState(false);
	const open = useCallback((target?: RouteTargetType) => {
		onOpen(target || RouteTargetType.From);
		setVisible(true);
	}, []);
	const close = useCallback(() => setVisible(false), []);
	useImperativeHandle(ref, () => ({
		open,
		close,
	}));

	return {
		visible,
		open,
		close,
	};
};
