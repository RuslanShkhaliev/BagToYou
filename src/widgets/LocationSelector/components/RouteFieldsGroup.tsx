import { YGroup, YStack } from 'tamagui';

import { Divider, ErrorMessage, ReverseButton } from '@components/ui-kit';
import { RouteField, RouteFieldProps } from './RouteField';

interface RouteFieldsGroupProps {
	fieldFrom: RouteFieldProps;
	fieldTo: RouteFieldProps;
	readOnly?: boolean;
	onlyTo?: boolean;
	error?: string;
	canReverse?: boolean;
	onReverse?: () => void;
}

export const RouteFieldsGroup = ({
	fieldFrom,
	fieldTo,
	readOnly = false,
	onlyTo = false,
	error,
	canReverse = true,
	onReverse,
}: RouteFieldsGroupProps) => {
	return (
		<YStack rounded={16}>
			<YGroup
				position={'relative'}
				bg={'$inputBg'}
				rounded={16}
				borderWidth={1}
				borderColor={error ? '$error' : 'transparent'}
			>
				{!onlyTo && (
					<YGroup.Item>
						<RouteField
							readOnly={readOnly}
							placeholder={fieldFrom.error || 'Origin'}
							{...fieldFrom}
							borderBottomWidth={0}
							borderTopLeftRadius={10}
							borderTopRightRadius={10}
						/>
						{canReverse && (
							<ReverseButton
								position={'absolute'}
								items={'center'}
								onPress={onReverse}
								r={5}
								t={5}
								height={40}
							/>
						)}
					</YGroup.Item>
				)}
				<Divider invalid={!!error} />
				<YGroup.Item>
					<RouteField
						readOnly={readOnly}
						placeholder={fieldTo.error || 'Where to'}
						{...fieldTo}
						borderTopWidth={0}
						borderBottomLeftRadius={10}
						borderBottomRightRadius={10}
					/>
				</YGroup.Item>
			</YGroup>
			<ErrorMessage message={error} />
		</YStack>
	);
};
