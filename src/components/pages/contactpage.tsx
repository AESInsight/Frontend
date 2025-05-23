import React from "react";
import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import ContactBubble from "../ui/contact_bubble";
import { useIsDesktop } from "@/lib/context/desktop_context";

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
	const isDesktop = useIsDesktop();
	return (
		<div className="h-screen w-screen flex flex-col relative">
			<div className="relative z-10 flex flex-col h-full w-full">
				<Header />
				<h1 className="text-3xl font-bold m-4 flex justify-center item-center overflow-y-auto pt-14">
					Contact Us
				</h1>
				<div className="flex flex-1 w-full justify-center items-center">
					{isDesktop && <Sidebar />}

					<div className="w-full flex justify-center items-center p-2 sm:p-6">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mx-auto max-w-xs sm:max-w-md md:max-w-full justify-items-center">
							{contacts.map((contact, index) => (
								<ContactBubble key={index} {...contact} />
							))}
						</div>
					</div>
				</div>
				<footer className="p-2 bg-gray-800 text-white text-center text-xs relative z-10">
					<p>2025 AES-Insight. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
};

export default AboutPage;
