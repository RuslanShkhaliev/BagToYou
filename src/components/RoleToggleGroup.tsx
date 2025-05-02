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
			type='single'
			backgroundColor='$tabBg'
			value={String(role)}
			onValueChange={(val: string) => onChange(Number(val))}
			disableDeactivation
			width='100%'
		>
			<ToggleGroupItem
				value={String(RequestRole.Deliver)}
				aria-label='carrier'
				width='50%'
				active={role === RequestRole.Deliver}
			>
				<Text>Перевозчик</Text>
			</ToggleGroupItem>

			<ToggleGroupItem
				value={String(RequestRole.Sender)}
				aria-label='sender'
				width='50%'
				active={role === RequestRole.Sender}
			>
				<Text>Отправитель</Text>
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
