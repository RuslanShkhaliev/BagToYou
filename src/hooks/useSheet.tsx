import { SheetWrapper } from '@/components/SheetWrapper';
import { memo, ReactElement, useCallback, useMemo, useState } from 'react';

type PropsFrom<TComponent> = TComponent extends React.ComponentType<infer Props> ? Props : never;

interface UseSheetReturn<TComponent extends React.ComponentType<any>> {
	open: (props?: Partial<PropsFrom<TComponent>>) => void;
	close: () => void;
	updateProps: (newProps: Partial<PropsFrom<TComponent>>) => void;
	SheetComponent: () => ReactElement | null;
}

export function useSheet<TComponent extends React.ComponentType<any>>(
	Component: TComponent,
	initialProps: Partial<PropsFrom<TComponent>> = {},
): UseSheetReturn<TComponent> {
	const [isOpen, setOpen] = useState(false);
	const [componentProps, setComponentProps] = useState<PropsFrom<TComponent>>(initialProps);

	console.log(Component.displayName, 'useSheet', { isOpen });
	const open = (props?: Partial<PropsFrom<TComponent>>) => {
		updateProps(props);
		setOpen(true);
	};
	const close = () => setOpen(false);
	const updateProps = useCallback(
		(newProps: Partial<PropsFrom<TComponent>> = {}) =>
			setComponentProps((prevProps) => ({ ...prevProps, ...newProps })),
		[Component],
	);

	const Comp = useMemo(() => Component, [Component]);

	const SheetComponent = memo(() => (
		<SheetWrapper open={isOpen} onOpenChange={setOpen}>
			<Comp {...componentProps} />
		</SheetWrapper>
	));

	return { open, close, updateProps, SheetComponent };
}
