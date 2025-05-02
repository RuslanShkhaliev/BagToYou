import { Location } from '@/common/schema';
import { create } from 'zustand/react';


interface UseSearchCitiesStore {
	cities: Location[];
	location: Location | null;
	setCities: (cities: Location[]) => void;
	setLocation: (location: Location) => void;
}


export const useSearchCitiesStore = create<UseSearchCitiesStore>((set) => ({
	cities: [],
	location: null,
	setLocation: (location) => set(() => ({ location })),
	setCities: (update) => set(() => ({ cities: [...update] })),
}));
