import { StepMedia } from '@modules/delivery/StepMedia';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectRouteAndDates } from 'src/modules/delivery/SelectRouteAndDates';

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
				component={StepMedia}
			/>
			<Stack.Screen
				name='Step3'
				component={StepMedia}
			/>
		</Stack.Navigator>
	);
};
