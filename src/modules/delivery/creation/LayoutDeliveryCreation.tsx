import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectMedia } from './SelectMedia';
import { SelectRouteAndDates } from './SelectRouteAndDates';

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
