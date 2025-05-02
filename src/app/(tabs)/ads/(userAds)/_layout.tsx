import { UserAdsLayout } from '@/modules/ads/UserAdsLayout';
import { Slot, usePathname, useRouter } from 'expo-router';

export default function UserAdsLayoutWrapper() {
	const pathname = usePathname();
	const router = useRouter();

	const currentTab = pathname.endsWith('/drafts') ? 'drafts' : 'active';

	const onChangeTab = (tab: 'active' | 'drafts') => {
		router.push(tab === 'drafts' ? '/ads/(userAds)/drafts' : '/ads/(userAds)');
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
