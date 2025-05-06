export interface UserAd {
	name: string;
	images: string[];
	expired: string;
}

export interface UserAds {
	drafts: UserAd[];
	active: UserAd[];
}
