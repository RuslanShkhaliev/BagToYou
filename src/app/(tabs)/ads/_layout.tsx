import { AdsType } from '@/modules/userAds/enums';
import { UserAdsLayout } from '@/modules/userAds/UserAdsLayout';
import { Slot, usePathname, useRouter } from 'expo-router';

export default function UserAdsLayoutWrapper() {
	const pathname = usePathname();
	const router = useRouter();

	const currentTab = pathname.endsWith('/drafts')
		? AdsType.Drafts
		: AdsType.Active;

	const onChangeTab = (tab: AdsType) => {
		router.push(tab === AdsType.Drafts ? '/(tabs)/ads/drafts' : '/(tabs)/ads');
	};

	return (
		<UserAdsLayout
			activeTab={currentTab}
			onChangeTab={onChangeTab}
		>
			<Slot />
		</UserAdsLayout>
	);
}
