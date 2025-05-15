import { Plus } from '@tamagui/lucide-icons';

import { useEffect } from 'react';

import { Minus } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { XStack } from 'tamagui';
import { ButtonStyled } from './buttons/ButtonStyled';
interface IncrementControlProps {
	onChange: (value: number) => void;
	value: string;
	step?: number;
	max?: number;
	min?: number;
}
export const IncrementControl = ({
	onChange,
	value,
	step = 1,
	max = Infinity,
	min = 0,
}: IncrementControlProps) => {
	const [counter, setCounter] = useState(Number(value));

	useEffect(() => {
		setCounter(Number(value));
	}, [value]);
	const handleIncrement = () => {
		setCounter((counter) => {
			const nextVal = Math.min(counter + step, max);
			onChange(nextVal);
			return nextVal;
		});
	};

	const handleDecrement = () => {
		setCounter((counter) => {
			const value = Math.max(counter - step, min);
			onChange(value);
			return value;
		});
	};
	return (
		<XStack gap={10}>
			<ButtonStyled
				onPress={handleDecrement}
				variant={'outlined'}
				disabled={Number(counter) <= min}
				disabledStyle={{
					opacity: 0.5,
				}}
			>
				<Minus color={'$textPrimary'} />
			</ButtonStyled>
			<ButtonStyled
				onPress={handleIncrement}
				variant={'outlined'}
				disabled={Number(counter) >= max}
			>
				<Plus color={'$textPrimary'} />
			</ButtonStyled>
		</XStack>
	);
};
