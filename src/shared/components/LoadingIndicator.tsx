import { ActivityIndicator } from 'react-native';
import { View } from 'tamagui';

export const LoadingIndicator = () => {
	return (
		<View
			flex={1}
			justify='center'
			items='center'
		>
			<ActivityIndicator
				size='large'
				color='$accent'
			/>
		</View>
	);
};
