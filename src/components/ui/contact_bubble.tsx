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
		<div className="flex flex-col items-center w-28 md:w-50 p-1.5 md:p-2 bg-white rounded-lg shadow-lg">
			{/* Profile Picture */}
			<img
				src={`/profilePic/${initials}.png`}
				alt="Profile"
				className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-sky-600"
			/>
			{/* Contact Info */}
			<div className="mt-1 md:mt-2 text-center">
				<p className="text-xs md:text-sm font-bold">{name}</p>
				<p className="text-[10px] md:text-xs text-gray-600">{phoneNumber}</p>
				<p className="text-[10px] md:text-xs text-gray-600">{email}</p>
			</div>
		</div>
	);
};

export default ContactBubble;
