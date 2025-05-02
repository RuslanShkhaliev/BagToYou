import { MediaAsset } from '@/common/schema';
import { MediaPicker } from '@/components/MediaPicker/MediaPicker';
import { ScreenScroll } from '@/components/ScreenScroll';
import { FormInput } from '@/components/ui/Inputs/FormInput';
import { LabelStyled } from '@/components/ui/LabelStyled';
import { TextareaThemed } from '@/components/ui/TextareaThemed';
import { formStep2Scheme, FormStep2Scheme } from '@/modules/delivery/schema';
import { useDeliveryStore } from '@/modules/delivery/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from '@tamagui/lucide-icons';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Button, Checkbox, debounce, Form, Heading, Text, XStack, YStack } from 'tamagui';

export const DeliveryStep2 = () => {
	const deliveryStore = useDeliveryStore();
	const [isMe, setIsMe] = useState(false);

	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<FormStep2Scheme>({
		resolver: zodResolver(formStep2Scheme),
		criteriaMode: 'firstError',
		defaultValues: {
			...deliveryStore.step2,
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	useEffect(() => {
		const debouncedUpdate = debounce(
			(values: FieldValues, { name }: { name?: keyof FieldValues }) => {
				if (!name || errors[name as keyof typeof errors]) {
					return;
				}
				deliveryStore.saveStep2(values);
			},
			500,
		);
		const { unsubscribe } = watch(debouncedUpdate);

		return () => {
			unsubscribe();
			debouncedUpdate.cancel();
		};
	}, []);

	const updateImages = (files: MediaAsset[]) => {
		deliveryStore.saveStep2({ media: files });
	};

	const onSubmit = (values: FormStep2Scheme) => {
		console.log(values);
	};

	return (
		<ScreenScroll>
			<Form
				gap="$6"
				onSubmit={handleSubmit(onSubmit)}
			>
				<YStack>
					<Heading
						fontSize={18}
						color="$textPrimary"
					>
						Получатель
					</Heading>

					<YStack gap={16}>
						<YStack gap={16}>
							<Controller
								name="name"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<FormInput
										required
										placeholder="Имя"
										onBlur={onBlur}
										onChangeText={onChange}
										textContentType="name"
										value={value}
										error={errors.name?.message}
									/>
								)}
							/>
							<Controller
								name="surname"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<FormInput
										required
										placeholder="Фамилия"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										textContentType="name"
										error={errors.surname?.message}
									/>
								)}
							/>
							<Controller
								name="phone"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<FormInput
										required
										placeholder="Телефон для связи"
										textContentType="telephoneNumber"
										keyboardType="phone-pad" //
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										error={errors.phone?.message}
									/>
								)}
							/>
						</YStack>
						<YStack>
							<XStack
								gap="$3"
								items="center"
							>
								<Checkbox
									id="checkbox-recipient"
									size="$4"
									checked={isMe}
									onCheckedChange={setIsMe}
								>
									<Checkbox.Indicator>
										<Check />
									</Checkbox.Indicator>
								</Checkbox>
								<LabelStyled
									fontSize={14}
									p={0}
									htmlFor="checkbox-recipient"
								>
									выбрать себя получателем
								</LabelStyled>
							</XStack>
							<Text
								color="$textSecondary"
								fontSize={10}
							>
								заполним данными из вашего профиля
							</Text>
						</YStack>
					</YStack>
				</YStack>
				<YStack>
					<YStack gap={10}>
						<Heading
							fontSize={18}
							color="$textPrimary"
						>
							Габариты посылки
						</Heading>
						<XStack
							gap="$3"
							items="center"
						>
							<Controller
								name="width"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<FormInput
										fontSize={14}
										label="Width (cm)"
										keyboardType="numeric"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										required
										error={errors.width?.message}
									/>
								)}
							/>

							<Controller
								name="length"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<FormInput
										fontSize={14}
										label="Length (cm)"
										keyboardType="numeric"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										required
										error={errors.length?.message}
									/>
								)}
							/>
						</XStack>
						<XStack
							gap="$3"
							items="center"
						>
							<Controller
								name="height"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<FormInput
										keyboardType="numeric"
										fontSize={14}
										label="Height (cm)"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										required
										error={errors.height?.message}
									/>
								)}
							/>
							<Controller
								name="weight"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<FormInput
										keyboardType="decimal-pad"
										fontSize={14}
										label="Weight (kg)"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										required
										error={errors.weight?.message}
									/>
								)}
							/>
						</XStack>
					</YStack>
					<MediaPicker
						media={deliveryStore.step2.media}
						onUpdate={updateImages}
					/>

					<YStack>
						<LabelStyled fontSize="$5">Подробное описание</LabelStyled>
						<Controller
							name="description"
							control={control}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextareaThemed
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
						/>
					</YStack>
				</YStack>
				<Controller
					name="rewards"
					control={control}
					render={({ field: { onChange, value, onBlur } }) => (
						<FormInput
							keyboardType="numeric"
							id="input-rewards"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="1000"
							label="Стоимость услуги"
							hint={'Заказчик увидит эту цену рядом с названием объявления'}
							error={errors.rewards?.message}
						/>
					)}
				/>
				<Form.Trigger asChild>
					<Button
						size="$4"
						fontSize={18}
					>
						Опубликовать
					</Button>
				</Form.Trigger>
			</Form>
		</ScreenScroll>
	);
};
