import { AuthFallback } from '@components/AuthFallback';
import { DetailsCard } from '@components/DetailsCard';
import { EmptyState } from '@components/EmptyState';
import { LayoutScreen, ScreenScroll } from '@components/layout';
import { ProfileInfo } from '@components/ProfileInfo';
import { WithAuth } from '@components/WithAuth';
import { useAdQuery } from '@modules/ads/queries';
import { AdDescription } from '@modules/ads/UserAdDetails/components/AdDescription';
import { AdHeader } from '@modules/ads/UserAdDetails/components/AdHeader';
import { AdMeta } from '@modules/ads/UserAdDetails/components/AdMeta';
import { ContactsDetails } from '@modules/ads/UserAdDetails/components/ContactsDetails';
import { ParcelDetails } from '@modules/ads/UserAdDetails/components/ParcelDetails';
import { RouteDeliveryDetails } from '@modules/ads/UserAdDetails/components/RouteDeliveryDetails';
import { RouteShipmentDetails } from '@modules/ads/UserAdDetails/components/RouteShipmentDetails';
import { getUserInfo } from '@modules/ads/UserAdDetails/constants';
import { AdType } from '@shared/api/models/ad';
import { AdDelivery } from '@shared/schemas/adDelivery';
import { AdShipment } from '@shared/schemas/adShipment';
import { Squirrel } from '@tamagui/lucide-icons';
import { useNavbar } from '@widgets/Navbar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'tamagui';

const isShipmentAd = (type: AdType) => {
	return type === AdType.Shipment;
};
export const AdDetails = () => {
	useNavbar();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data: adData, isLoading } = useAdQuery(id);
	const router = useRouter();

	console.log(adData?.createdAt, 'createdAt');

	const userInfo = useMemo(() => getUserInfo(), []);

	if (isLoading) {
		return (
			<LayoutScreen>
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
			</LayoutScreen>
		);
	}

	if (!adData) {
		return (
			<LayoutScreen>
				<View
					flex={1}
					justify='center'
					items='center'
				>
					<EmptyState
						title={'Объявление не найдено'}
						Icon={Squirrel}
						buttonText={'Вернуться назад'}
						onButtonPress={() => router.dismissTo('/ads')}
						iconColor={'$orange500'}
					/>
				</View>
			</LayoutScreen>
		);
	}

	return (
		<LayoutScreen px={0}>
			<ScreenScroll>
				<View
					flex={1}
					gap={20}
				>
					<AdHeader
						name={adData.name}
						rewards={adData.rewards}
						metrics={adData.metrics}
						media={adData.media}
					/>
					{isShipmentAd(adData.type) ? (
						<RouteShipmentDetails
							route={adData.route}
							date={(adData as AdShipment).date}
						/>
					) : (
						<RouteDeliveryDetails
							route={adData.route}
							dates={(adData as AdDelivery).dates}
							transport={(adData as AdDelivery).transport}
						/>
					)}

					<ParcelDetails
						title={
							isShipmentAd(adData.type)
								? 'Информация о посылке'
								: 'Допустимые размеры посылки'
						}
						data={adData.parcelInfo}
					/>

					<AdDescription>{adData.description}</AdDescription>

					<ProfileInfo
						{...userInfo}
						id={adData.userId}
					/>

					<WithAuth
						fallback={
							<DetailsCard.Layout title={'Контактные данные'}>
								<AuthFallback
									hideIcon
									description={
										'Чтобы посмотреть контактные данные войдите или зарегистрируйтесь.'
									}
								/>
							</DetailsCard.Layout>
						}
					>
						{isShipmentAd(adData.type) && (
							<>
								<ContactsDetails
									title='Контакт отправителя'
									data={(adData as AdShipment).senderInfo}
								/>
								<ContactsDetails
									title='Контакт получателя'
									data={(adData as AdShipment).recipientInfo}
								/>
							</>
						)}
					</WithAuth>

					<AdMeta
						createdAt={adData.createdAt}
						count={10}
					/>
				</View>
			</ScreenScroll>
		</LayoutScreen>
	);
};
