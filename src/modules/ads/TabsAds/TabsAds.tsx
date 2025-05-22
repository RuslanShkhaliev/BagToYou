import { useUserAdsQuery } from '@modules/ads/queries';
import { TabRoute } from '@modules/ads/TabsAds/interfaces';
import { Tabbar } from '@modules/ads/TabsAds/Tabbar';
import { AdList } from '@modules/ads/UserAdList/AdList';
import { AdStatus } from '@shared/api/models/ad';
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import type { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types';
import { useWindowDimensions, View } from 'tamagui';

// Константы для меток вкладок
const TAB_LABELS = {
	[AdStatus.Active]: 'Активные',
	[AdStatus.Created]: 'На модерации',
	[AdStatus.Draft]: 'Черновики',
	[AdStatus.Archived]: 'Архив',
	[AdStatus.Cancelled]: 'Удаленные',
};

interface TabsLayoutProps {
	activeTab?: AdStatus;
	onChange?: (tab: AdStatus) => void;
}

export const TabsAds = ({ activeTab, onChange }: TabsLayoutProps) => {
	const { data } = useUserAdsQuery();
	const layout = useWindowDimensions();

	const routes = useMemo(() => {
		if (!data) {
			return [];
		}

		return Object.entries(data).reduce((tabs, [status, ads]) => {
			if (TAB_LABELS[status as never]) {
				tabs.push({
					key: status,
					title: TAB_LABELS[status as never],
					data: ads,
					count: ads.length,
				});
			}

			return tabs;
		}, [] as TabRoute[]);
	}, [data]);

	// Находим индекс активной вкладки
	const activeIndex = useMemo(() => {
		const index = routes.findIndex((route) => route.key === activeTab);
		return index >= 0 ? index : 0;
	}, [routes, activeTab]);

	const [index, setIndex] = useState(activeIndex);

	// Обработчик изменения вкладки
	const handleIndexChange = (index: number) => {
		setIndex(index);
		const newTab = routes[index].key;
		onChange?.(newTab);
	};

	// Создаем сцены для каждого статуса
	const renderScene = useMemo(() => {
		const scenes: Record<string, React.ComponentType<any>> = {};

		routes.forEach((route) => {
			scenes[route.key] = () => (
				<View
					pt={20}
					flex={1}
				>
					<AdList
						status={route.key}
						data={route.data}
					/>
				</View>
			);
		});

		return SceneMap(scenes);
	}, [routes]);

	// Кастомный рендер заголовка вкладки
	const renderTabBar = (props: SceneRendererProps) => <Tabbar {...props} />;

	if (routes.length === 0) {
		return null;
	}

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={handleIndexChange}
			initialLayout={{ width: layout.width }}
			renderTabBar={renderTabBar}
			style={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
