import { Ref, useRef, useState } from 'react';

import { RouteTargetType } from '@widgets/RoutePicker/types';
import { useCallback } from 'react';

import { useImperativeHandle } from 'react';
import { ModalWrapperRef } from '../SearchLocation.Modal';

export const useModalSearch = () => {
	const modalRef = useRef<ModalWrapperRef>(null);

	return {
		modalRef,
		open: (target?: RouteTargetType) =>
			modalRef.current?.open(target || RouteTargetType.To),
		close: () => modalRef.current?.close(),
	};
};

interface UseDefineSearchModalProps {
	ref: Ref<ModalWrapperRef>;
	onOpen?: (target: RouteTargetType) => void;
	onClose?: () => void;
}

export const useDefineSearchModal = ({
	ref,
	onOpen,
	onClose,
}: UseDefineSearchModalProps) => {
	const [visible, setVisible] = useState(false);
	const open = useCallback((target?: RouteTargetType) => {
		onOpen?.(target || RouteTargetType.From);
		setVisible(true);
	}, []);
	const close = useCallback(() => {
		setVisible(false);
		onClose?.();
	}, []);
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
