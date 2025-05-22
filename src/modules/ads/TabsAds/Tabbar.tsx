import { TextThemed } from '@components/ui-kit';
import { TabRoute } from '@modules/ads/TabsAds/interfaces';
import { StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { View } from 'tamagui';

export const Tabbar = (props: any) => {
	return (
		<TabBar
			{...props}
			indicatorStyle={styles.indicator}
			style={styles.tabBar}
			renderLabel={({
				route,
				focused,
			}: {
				route: TabRoute;
				focused: boolean;
			}) => (
				<View style={styles.tabItem}>
					<TextThemed
						fontSize={16}
						fontWeight={focused ? 600 : 400}
						color={focused ? '$accent' : '$textSecondary'}
					>
						{route.title}
					</TextThemed>
					{route.count > 0 && (
						<View style={styles.badge}>
							<TextThemed
								fontSize={12}
								color='$textSecondary'
							>
								{route.count}
							</TextThemed>
						</View>
					)}
				</View>
			)}
			scrollEnabled
			tabStyle={styles.tab}
		/>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: 'transparent',
		elevation: 0,
		shadowOpacity: 0,
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	indicator: {
		backgroundColor: '#fff', // $accent
		height: 3,
	},
	tab: {
		width: 'auto',
		paddingHorizontal: 16,
	},
	tabItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	badge: {
		backgroundColor: '#2E7CF6', // $accent
		borderRadius: 10,
		paddingHorizontal: 6,
		paddingVertical: 2,
		minWidth: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
