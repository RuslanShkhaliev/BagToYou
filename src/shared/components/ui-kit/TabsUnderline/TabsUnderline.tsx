import { useEffect, useRef, useState } from 'react';
import { View as RNView } from 'react-native';
import { ToggleGroup, View } from 'tamagui';
import { TabsUnderlineContext } from './context';

interface TabsUnderlineProps<T extends string> {
	activeTab: T;
	onChangeTab: (tab: T) => void;
	children: React.ReactNode;
}

export const TabsUnderline = <T extends string>({
	activeTab,
	onChangeTab,
	children,
}: TabsUnderlineProps<T>) => {
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

	const refs = useRef<Record<string, RNView | null>>({});
	const containerRef = useRef<RNView | null>(null);

	const register = (key: string, ref: RNView) => {
		refs.current[key] = ref;
	};
	useEffect(() => {
		const ref = refs.current[activeTab];
		const container = containerRef.current;

		if (ref && container && 'measureLayout' in ref) {
			// измеряем tab относительно контейнера
			ref.measureLayout(container, (x, y, width) => {
				setIndicatorStyle({ left: x, width });
			});
		}
	}, [activeTab]);
	return (
		<TabsUnderlineContext.Provider value={{ register, activeTab }}>
			<ToggleGroup
				ref={containerRef}
				unstyled
				type={'single'}
				disableDeactivation
				value={activeTab}
				onValueChange={onChangeTab}
				borderBottomRightRadius={0}
				borderBottomLeftRadius={0}
				borderBottomWidth={2}
				borderColor={'$graphite600'}
				justify={'flex-start'}
				gap={10}
				position={'relative'}
			>
				{children}
				<View
					height={2}
					position={'absolute'}
					b={-2}
					bg={'$textPrimary'}
					z={1}
					animation='quick'
					animateOnly={['transform', 'width']}
					width={indicatorStyle.width}
					transform={[{ translateX: indicatorStyle.left }]}
				/>
			</ToggleGroup>
		</TabsUnderlineContext.Provider>
	);
};
