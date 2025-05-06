import { LocationSearchModal } from '@/modals/LocationSearchModal';
import { useRef } from 'react';
import { View } from 'tamagui';

export const SomeComponent = () => {
	const modalRef = useRef<LocationSearchModal | null>(null);

	return (
		<View>
			{/* ... структура компонента  */}

			<LocationSearchModal
				ref={modalRef}
				onComplete={}
				onClose={}
				initialRoute={}
			/>
		</View>
	);
};
