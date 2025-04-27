import { MediaAsset } from '@/common/schema';
import { MediaPicker } from '@/components/MediaPicker/MediaPicker';
import { PageWrapper } from '@/components/PageWrapper';
import { InputField } from '@/components/ui/InputField';
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
		<PageWrapper>
			<Form gap="$6" onSubmit={handleSubmit(onSubmit)}>
				<YStack>
					<Heading fontSize={18} color="$textPrimary">
						Получатель
					</Heading>

					<YStack gap={16}>
						<YStack gap={16}>
							<Controller
								name="name"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<InputField
										required
										placeholder="Имя"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										errorMessage={errors.name?.message}
										isInvalid={!!errors.name?.message}
									/>
								)}
							/>
							<Controller
								name="surname"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<InputField
										required
										placeholder="Фамилия"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										textContentType="creditCardNumber"
										errorMessage={errors.surname?.message}
										isInvalid={!!errors.surname?.message}
									/>
								)}
							/>
							<Controller
								name="phone"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<InputField
										required
										placeholder="Телефон для связи"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										errorMessage={errors.phone?.message}
										isInvalid={!!errors.phone?.message}
									/>
								)}
							/>
						</YStack>
						<YStack>
							<XStack gap="$3" alignItems="center">
								<Checkbox
									id="checkbox-recipient"
									size="$3"
									checked={isMe}
									onCheckedChange={setIsMe}
								>
									<Checkbox.Indicator>
										<Check />
									</Checkbox.Indicator>
								</Checkbox>
								<LabelStyled padding={0} height={14} htmlFor="checkbox-recipient">
									выбрать себя получателем
								</LabelStyled>
							</XStack>
							<Text color="$textSecondary" fontSize={10}>
								заполним данными из вашего профиля
							</Text>
						</YStack>
					</YStack>
				</YStack>
				<YStack>
					<YStack gap={10}>
						<Heading fontSize={18} color="$textPrimary">
							Габариты посылки
						</Heading>
						<XStack gap="$3" alignItems="center">
							<Controller
								name="width"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value, onBlur } }) => (
									<InputField
										fontSize={14}
										label="Width(cm)"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										required
										errorMessage={errors.width?.message}
										isInvalid={!!errors.width?.message}
									/>
								)}
							/>

							<Controller
								name="length"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<InputField
										fontSize={14}
										label="Length(cm)"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										required
										errorMessage={errors.length?.message}
										isInvalid={!!errors.length?.message}
									/>
								)}
							/>
						</XStack>
						<XStack gap="$3" alignItems="center">
							<Controller
								name="height"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<InputField
										fontSize={14}
										label="Height(cm)"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										required
										errorMessage={errors.height?.message}
										isInvalid={!!errors.height?.message}
									/>
								)}
							/>
							<Controller
								name="weight"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<InputField
										fontSize={14}
										label="Weight(kg)"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										required
										errorMessage={errors.weight?.message}
										isInvalid={!!errors.weight?.message}
									/>
								)}
							/>
						</XStack>
					</YStack>
					<MediaPicker media={deliveryStore.step2.media} onUpdate={updateImages} />

					<YStack>
						<LabelStyled fontSize={12}>Подробное описание</LabelStyled>
						<Controller
							name="description"
							control={control}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextareaThemed onBlur={onBlur} onChangeText={onChange} value={value} />
							)}
						/>
					</YStack>
				</YStack>
				<Controller
					name="rewards"
					control={control}
					render={({ field: { onChange, value, onBlur } }) => (
						<InputField
							id="input-rewards"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="1000"
							label="Укажите вознаграждение"
							errorMessage={errors.rewards?.message}
							isInvalid={!!errors.rewards?.message}
						/>
					)}
				/>
				<Form.Trigger asChild>
					<Button size="$4" fontSize={18}>
						Опубликовать
					</Button>
				</Form.Trigger>
			</Form>
		</PageWrapper>
	);
};
