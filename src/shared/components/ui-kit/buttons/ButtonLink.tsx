import {
	ButtonStyled,
	ButtonStyledProps,
} from '@components/ui-kit/buttons/ButtonStyled';
import { Link, LinkProps } from 'expo-router';

type ButtonLinkProps = Omit<ButtonStyledProps, 'href'> & LinkProps;

export const ButtonLink = ({
	href,
	children,
	replace,
	...props
}: ButtonLinkProps) => {
	return (
		<Link
			href={href}
			asChild
			replace={replace}
			style={{
				textDecorationLine: 'none',
			}}
		>
			<ButtonStyled {...props}>{children}</ButtonStyled>
		</Link>
	);
};
