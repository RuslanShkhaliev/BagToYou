import { firestore } from '@lib/firebase';
import { AdStatus } from '@shared/api/models/ad';
import { AdRequestModel } from '@shared/api/models/ad/types';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const createAdRequest = async <T>(ad: T): Promise<AdRequestModel<T>> => {
	try {
		const user = getAuth().currentUser;
		if (!user) {
			throw new Error('Unauthenticated user');
		}
		const adRequestModel: AdRequestModel<T> = {
			...ad,
			userId: user.uid,
			status: AdStatus.Created,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};
		const adsRef = await addDoc(
			collection(firestore, 'ads'),
			adRequestModel,
		);

		return { id: adsRef.id, ...adRequestModel };
	} catch (error) {
		console.error('Error adding ad:', error);
		throw error;
	}
};
