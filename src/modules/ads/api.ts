import { firestore } from '@lib/firebase';
import { AdResponseModel } from '@shared/api/models/ad/types';
import { AdDelivery } from '@shared/schemas/adDelivery';
import { AdShipment } from '@shared/schemas/adShipment';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';

export type UserAdModel = AdResponseModel<AdShipment | AdDelivery>;

export const fetchUserAds = async (userId: string): Promise<UserAdModel[]> => {
	try {
		const adsQuery = query(
			collection(firestore, 'ads'),
			where('userId', '==', userId),
		);

		const snapshot = await getDocs(adsQuery);

		return snapshot.docs.map(
			(doc) =>
				({
					id: doc.id,
					...doc.data(),
				}) as UserAdModel,
		);
	} catch (error) {
		console.error('Error fetching user ads:', error);
		throw error;
	}
};

export const fetchAdById = async (id: string): Promise<UserAdModel | null> => {
	try {
		if (!id) {
			console.error('Error fetching ad: ID is empty');
			return null;
		}

		const docRef = doc(firestore, 'ads', id);

		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			console.log(`Document with ID ${id} not found`);
			return null;
		}

		const data = docSnap.data({
			serverTimestamps: 'estimate',
		});

		// Проверка наличия обязательных полей
		if (!data) {
			console.error('Document data is empty');
			return null;
		}

		return {
			id: docSnap.id,
			...data,
		} as UserAdModel;
	} catch (error) {
		console.error(`Error fetching ad with ID ${id}:`, error);
		// Более подробная информация об ошибке
		if (error instanceof Error) {
			console.error('Error name:', error.name);
			console.error('Error message:', error.message);
			console.error('Error stack:', error.stack);
		}
		throw error;
	}
};

export const deleteAdById = async (id: string): Promise<void> => {};
