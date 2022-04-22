import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { ContextType } from "../../App";
import UploadModal from "../UploadModal";

const Avatar = ({ image }: { image: Blob | undefined }) => {
	const [imageHover, setImageHover] = useState(false);
	const context: ContextType = useOutletContext();
	const [avatar, setAvatar] = useState("");
	const location = useLocation();
	const [profileName, setProfileName] = useState("");

	useEffect(() => {
		// Get the pathname without the prefix /
		const profilePath = location.pathname.split("/")[1];
		setProfileName(profilePath);
		if (image) setAvatar(URL.createObjectURL(image));
	}, [image]);

	return (
		<div
			onMouseEnter={() => {
				if (profileName === context.username) {
					setImageHover(() => true);
				}
			}}
			onMouseLeave={() => {
				if (profileName === context.username) {
					setImageHover(() => false);
				}
			}}
		>
			{image ? (
				<div className="avatar mask rounded-full flex flex-col place-content-end text-center pb-4">
					<img src={avatar} alt="profile"></img>
					{imageHover ? (
						<UploadModal
							{...Avatar.defaultProps}
							navigateUrl={`/${context.username}`}
						/>
					) : (
						<></>
					)}
				</div>
			) : (
				<div className="avatar mask rounded-full bg-gradient-to-t from-teal-300 to-purple-300 flex flex-col text-white place-content-end pb-4">
					{imageHover ? (
						<UploadModal
							{...Avatar.defaultProps}
							navigateUrl={`/${context.username}`}
						/>
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
};

Avatar.defaultProps = {
	url: "http://localhost:8000/api/v1/user/update-avatar",
	fileTypes: ["image/jpeg", "image/png", ".jpg", ".png", ".jpeg"],
	modalTitle: "Update profile image",
	modalButtonStyles:
		"text-white z-10 bg-gray-500 bg-opacity-50 max-w-fit mx-auto px-4",
	fileAccept: "image/*",
	modalButtonName: "Edit",
};

export default Avatar;
