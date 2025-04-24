import { RequestRole } from '@/common';
import { ToggleGroupItem } from '@/components/ToggleGroupItem';
import { Text, ToggleGroup } from 'tamagui';

interface Props {
	onChange: (role: RequestRole) => void;
	role: RequestRole;
}
export const RoleToggleGroup = ({ onChange, role }: Props) => {
	return (
		<ToggleGroup
			type="single"
			value={String(role)}
			onValueChange={(val) => onChange(Number(val))}
			disableDeactivation
			animation="superBouncy"
			backgroundColor="none"
			width="100%"
			height={28}
		>
			<ToggleGroupItem
				value={String(RequestRole.Receiver)}
				aria-label="carrier"
				width="50%"
				height="100%"
				active={role === RequestRole.Receiver}
			>
				<Text>Перевозчик</Text>
			</ToggleGroupItem>

			<ToggleGroupItem
				value={String(RequestRole.Sender)}
				aria-label="sender"
				width="50%"
				height="100%"
				active={role === RequestRole.Sender}
			>
				<Text>Отправитель</Text>
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
