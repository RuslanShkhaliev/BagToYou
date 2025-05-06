import { SelectMedia } from '@/modules/delivery/creation/SelectMedia';
import { SelectRouteAndDates } from '@/modules/delivery/creation/SelectRouteAndDates';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const LayoutDeliveryCreation = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				presentation: 'modal',
			}}
		>
			<Stack.Screen
				name='Step1'
				component={SelectRouteAndDates}
			/>
			<Stack.Screen
				name='Step2'
				component={SelectMedia}
			/>
			<Stack.Screen
				name='Step3'
				component={SelectMedia}
			/>
		</Stack.Navigator>
	);
};
