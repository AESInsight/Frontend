import React from "react";
import {
	faEye,
	faHelmetSafety,
	faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DefaultComponent: React.FC = () => {
	return (
		<div className="bg-sky-700 shadow-lg border text-center">
			<span>
				<h1 className="text-3xl text-white mb-4 font-bold">
					Welcome to AESInsight
				</h1>
			</span>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-white p-6">
				<div className="bg-sky-700 shadow-lg rounded-lg p-8 max-w-md text-center">
					<h1 className="text-4xl font-bold mb-4">AESInsight</h1>
					<div className="w-full bg-white p-4 rounded-lg shadow-md mt-4 mb-4">
						<FontAwesomeIcon
							icon={faHelmetSafety}
							size="4x"
							className="text-yellow-400"
						/>
						<p className="text-lg text-black">
							The Webside is under construction
						</p>
					</div>
					<div className="flex space-x-4 justify-center">
						<div className="flex flex-col items-center w-1/2 bg-white p-4 rounded-lg shadow-md">
							<FontAwesomeIcon icon={faEye} size="2x" className="text-black" />
							<p className="mt-2 text-black text-center">
								Clear visualization of your pay difference
							</p>
						</div>

						<div className="flex flex-col items-center w-1/2 bg-white p-4 rounded-lg shadow-md">
							<FontAwesomeIcon
								icon={faPeopleGroup}
								size="2x"
								className="text-black"
							/>
							<p className="mt-2 text-black text-center">
								For more information about us, visit our Github
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DefaultComponent;
