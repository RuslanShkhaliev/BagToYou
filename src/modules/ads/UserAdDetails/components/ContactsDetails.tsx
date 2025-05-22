import { DetailsCard } from '@components/DetailsCard';
import { MessageCircleMore, Phone, User } from '@tamagui/lucide-icons';
import { ContactSchema } from 'src/shared/schemas';

interface ContactsDetailsProps {
	title: string;
	data: Partial<ContactSchema>;
}

export const ContactsDetails = ({ title, data }: ContactsDetailsProps) => {
	const { name, surname, phone, messenger } = data;
	return (
		<DetailsCard.Layout title={title}>
			{(name || surname) && (
				<DetailsCard.Item
					icon={
						<User
							size={20}
							color='$accent'
						/>
					}
					label='Name'
					description={`${name || ''} ${surname || ''}`}
				/>
			)}
			{phone && (
				<DetailsCard.Item
					icon={
						<Phone
							size={20}
							color='$accent'
						/>
					}
					label='Phone'
					description={phone}
				/>
			)}
			{messenger && (
				<DetailsCard.Item
					icon={
						<MessageCircleMore
							size={20}
							color='$accent'
						/>
					}
					label='Messangers'
					description={messenger.join(', ')}
				/>
			)}
		</DetailsCard.Layout>
	);
};
