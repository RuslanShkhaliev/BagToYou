import { createContext, useContext } from 'react';
import { View } from 'react-native';

export interface TabUnderlineItemContext {
	register: (key: string, ref: View) => void;
	activeTab: string;
}

export const TabsUnderlineContext =
	createContext<TabUnderlineItemContext | null>(null);

export const useTabsUnderlineContext = () => {
	const ctx = useContext(TabsUnderlineContext);
	if (!ctx) {
		throw new Error('TabsUnderline must be inside TabsPlain');
	}
	return ctx;
};
