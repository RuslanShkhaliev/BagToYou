import { YGroup } from 'tamagui';
import { RouteField, RouteFieldProps } from './RouteField';

import { Divider } from '@components/ui-kit';
interface RouteFieldsGroupProps {
	fieldFrom: RouteFieldProps;
	fieldTo: RouteFieldProps;
	readOnly?: boolean;
	onlyTo?: boolean;
}
export const RouteFieldsGroup = ({
	fieldFrom,
	fieldTo,
	readOnly = false,
	onlyTo = false,
}: RouteFieldsGroupProps) => {
	return (
		<YGroup
			bg={'$inputBg'}
			overflow={'hidden'}
			rounded={16}
		>
			{!onlyTo && (
				<YGroup.Item>
					<RouteField
						readOnly={readOnly}
						placeholder='Origin'
						{...fieldFrom}
					/>
				</YGroup.Item>
			)}
			<Divider />
			<YGroup.Item>
				<RouteField
					readOnly={readOnly}
					placeholder='Where to'
					{...fieldTo}
				/>
			</YGroup.Item>
		</YGroup>
	);
};
