import React from "react";

interface ContactBubbleProps {
	name: string;
	phoneNumber: string;
	email: string;
	initials: string;
}

const ContactBubble: React.FC<ContactBubbleProps> = ({
	name,
	initials,
	phoneNumber,
	email,
}) => {
	return (
		<div className="flex flex-col items-center w-50 p-2 bg-white rounded-lg shadow-lg">
			{/* Profile Picture */}
			<img
				src={`/profilePic/${initials}.png`}
				alt="Profile"
				className="w-20 h-20 rounded-full border-2 border-sky-600"
			/>
			{/* Contact Info */}
			<div className="mt-2 text-center">
				<p className="text-sm font-bold">{name}</p>
				<p className="text-xs text-gray-600">{phoneNumber}</p>
				<p className="text-xs text-gray-600">{email}</p>
			</div>
		</div>
	);
};

export default ContactBubble;
