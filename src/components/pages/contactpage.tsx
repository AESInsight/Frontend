import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import ContactBubble from "../ui/contact_bubble";

const contacts = [
	{
		name: "Christopher Dolan",
		phoneNumber: "+45 30 13 48 26",
		email: "cd@aes-insight.dk",
		initials: "cd",
	},
	{
		name: "Simon Eifer",
		phoneNumber: "+45 21 97 72 92",
		email: "se@aes-insight.dk",
		initials: "se",
	},
	{
		name: "Jeppe Fristed",
		phoneNumber: "+45 60 56 82 60",
		email: "jf@aes-insight.dk",
		initials: "jf",
	},
	{
		name: "Victoria Jacobsen",
		phoneNumber: "+45 23 90 88 19",
		email: "vj@aes-insight.dk",
		initials: "vj",
	},
	{
		name: "Thea Brunebjerg Høgh",
		phoneNumber: "+45 61 31 73 66",
		email: "tbh@aes-insight.dk",
		initials: "tbh",
	},
	{
		name: "Marius Greve Philipsen",
		phoneNumber: "+45 29 46 53 97",
		email: "mgp@aes-insight.dk",
		initials: "mgp",
	},
	{
		name: "Christopher Faurholt Fast",
		phoneNumber: "+45 28 99 26 96",
		email: "cff@aes-insight.dk",
		initials: "cff",
	},
	{
		name: "Michael Dao",
		phoneNumber: "+45 60 59 52 52",
		email: "md@aes-insight.dk",
		initials: "md",
	},
	{
		name: "Karam Alchamat",
		phoneNumber: "+45 89 89 56 45",
		email: "ka@aes-insight.dk",
		initials: "ka",
	},
];

const AboutPage: React.FC = () => {
	return (
		<div className="h-screen w-screen flex flex-col relative" data-testid="contact-page">
			<div className="relative z-10 flex flex-col h-full w-full" data-testid="contact-content">
				<Header />
				<h1 className="text-3xl font-bold m-4 flex justify-center item-center overflow-y-auto pt-14" data-testid="contact-title">
					Contact Us
				</h1>
				<div className="flex flex-1 w-full" data-testid="contact-main">
					<Sidebar />

					<div className="flex flex-1 justify-center items-center p-6" data-testid="contact-grid-container">
						<div className="grid grid-cols-3 gap-6" data-testid="contact-grid">
							{contacts.map((contact, index) => (
								<ContactBubble key={index} {...contact} data-testid={`contact-bubble-${index}`} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
