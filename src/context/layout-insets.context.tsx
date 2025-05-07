import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

interface UILayoutContextType {
	tabBarHeight: number;
	setTabBarHeight: (h: number) => void;

	stickyHeight: number;
	setStickyHeight: (h: number) => void;

	bottomOffset: number;

	headerHeight: number;
	setHeaderHeight: (h: number) => void;
}

const LayoutInsetsContext = createContext<UILayoutContextType | null>(null);

export const LayoutInsetsProvider = ({ children }: PropsWithChildren) => {
	const [tabBarHeight, setTabBarHeight] = useState(0);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [stickyHeight, setStickyHeight] = useState(0);

	const bottomOffset = useMemo(
		() => tabBarHeight + stickyHeight,
		[tabBarHeight, stickyHeight],
	);

	useEffect(() => {
		console.log(tabBarHeight);
	}, [tabBarHeight]);
	const context = {
		bottomOffset,
		tabBarHeight,
		setTabBarHeight,

		stickyHeight,
		setStickyHeight,

		headerHeight,
		setHeaderHeight,
	};

	return (
		<LayoutInsetsContext.Provider value={context}>
			{children}
		</LayoutInsetsContext.Provider>
	);
};

export const useLayoutInsetsContext = () => {
	const ctx = useContext(LayoutInsetsContext);
	if (!ctx) {
		throw new Error('useLayoutInsets must be used within LayoutInsetsProvider');
	}
	return ctx;
};
