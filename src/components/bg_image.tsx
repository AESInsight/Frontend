import React from "react";

interface BgImageProps {
	className?: string;
}

const BgImage: React.FC<BgImageProps> = ({ className }) => {
	return (
		<img
			src={"/bgimage.png"}
			className={`absolute inset-0 w-full h-full object-cover ${className}`}
			alt="Background"
		/>
	);
};

export default BgImage;
