import { YGroup } from 'tamagui';

import { Divider } from '@components/ui-kit';
import { RouteField, RouteFieldProps } from './route-field';

interface RouteFieldsGroupProps {
	fieldFrom: RouteFieldProps;
	fieldTo: RouteFieldProps;
	error?: string;
	readOnly?: boolean;
	onlyTo?: boolean;
}

export const RouteFieldsGroup = ({
	fieldFrom,
	fieldTo,
	error,
	readOnly = false,
	onlyTo = false,
}: RouteFieldsGroupProps) => {
	return (
		<YGroup
			bg={'$inputBg'}
			overflow={'hidden'}
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
					/>
				</YGroup.Item>
			)}
			<Divider />
			<YGroup.Item>
				<RouteField
					readOnly={readOnly}
					placeholder={fieldTo.error || 'Where to'}
					{...fieldTo}
				/>
			</YGroup.Item>
		</YGroup>
	);
};
