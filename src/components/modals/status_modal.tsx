import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSpinner,
	faCheckCircle,
	faTimesCircle,
	faTimes
} from "@fortawesome/free-solid-svg-icons";

interface StatusModalProps {
	isOpen: boolean;
	onClose: () => void;
	status: "loading" | "success" | "error";
	message?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
	isOpen,
	onClose,
	status,
	message,
}) => {
	const [show, setShow] = useState(isOpen);

	useEffect(() => {
		setShow(isOpen);
		if (status === "success" || status === "error") {
			const timer = setTimeout(() => {
				setShow(false);
				onClose();
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [isOpen, status, onClose]);

	if (!show) return null;

	const getStatusContent = () => {
		switch (status) {
			case "loading":
				return (
					<div className="flex flex-col items-center">
						<FontAwesomeIcon
							icon={faSpinner}
							className="text-sky-600 text-4xl animate-spin"
							data-testid="spinner-icon"
						/>
						<p className="mt-4 text-lg font-semibold text-gray-700" data-testid="status-message">
							Processing...
						</p>
					</div>
				);
			case "success":
				return (
					<div className="flex flex-col items-center">
						<FontAwesomeIcon
							icon={faCheckCircle}
							className="text-green-600 text-4xl"
							data-testid="check-icon"
						/>
						<p className="mt-4 text-lg font-semibold text-green-600" data-testid="status-message">
							{message || "Changes saved successfully!"}
						</p>
					</div>
				);
			case "error":
				return (
					<div className="flex flex-col items-center">
						<FontAwesomeIcon
							icon={faTimesCircle}
							className="text-red-600 text-4xl"
							data-testid="xmark-icon"
						/>
						<p className="mt-4 text-lg font-semibold text-red-600" data-testid="status-message">
							{message || "Failed to save changes. Please try again."}
						</p>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className={`fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300 ${
				show ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className={`relative bg-white rounded-2xl shadow-xl p-6 w-80 transform transition-all duration-300 border-2 border-black ${
					show ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				<button
					onClick={() => {
						setShow(false);
						onClose();
					}}
					className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl font-bold focus:outline-none hover:cursor-pointer"
					aria-label="Close modal"
				>
					<FontAwesomeIcon icon={faTimes} size="sm" />
				</button>

				{getStatusContent()}
			</div>
		</div>
	);
};

export default StatusModal;
