import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { User } from "../../interfaces/interface";
import UploadModal from "../UploadModal";

export default function Avatar({ image }: { image: Blob | undefined }) {
	const [imageHover, setImageHover] = useState(false);

	return (
		<div
			onMouseEnter={() => setImageHover(true)}
			onMouseLeave={() => setImageHover(false)}
		>
			{image ? (
				<div className="avatar mask rounded-full w-72 h-72 flex flex-col place-content-end text-center pb-4">
					<img src={URL.createObjectURL(image)} alt="profile"></img>
					{imageHover ? <UploadModal {...Avatar.defaultProps} /> : <></>}
				</div>
			) : (
				<div className="avatar rounded-full bg-gradient-to-t from-teal-300 to-purple-300 w-72 h-72 flex flex-col text-white place-content-end pb-4">
					{imageHover ? <UploadModal {...Avatar.defaultProps} /> : <></>}
				</div>
			)}
		</div>
	);
}

Avatar.defaultProps = {
	url: "http://localhost:8000/api/v1/user/update-avatar",
	fileTypes: ["image/jpeg", "image/png", ".jpg", ".png", ".jpeg"],
	modalTitle: "Update profile image",
	modalButtonStyles: "text-white z-10 bg-gray-500 bg-opacity-50 max-w-fit mx-auto px-4",
	fileAccept: "image/*",
	navigateUrl: "/profile",
	modalButtonName: "Edit",
};
