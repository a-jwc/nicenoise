import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../interfaces/interface";
import Avatar from "./Avatar";

const UserHeader = ({
	userInfo,
	isLoading,
	error,
}: {
	userInfo: User;
	isLoading: boolean;
	error: unknown;
}) => {
	const [avatar, setAvatar] = useState<Blob>();
	const params = useParams();

	useEffect(() => {
		if (userInfo.avatar) {
			fetch(`http://localhost:8000/api/v1/user/get-avatar/${params.username}`, {
				mode: "cors",
				credentials: "include",
			})
				.then((res) => {
					if (!res.ok) throw Error("Response not ok");
					return res.blob();
				})
				.then((blob) => {
					if (blob) setAvatar(blob);
				})
				.catch((err) => {
					throw err;
				});
		}
	}, [userInfo.avatar]);

	return (
		<>
			{error ? (
				<span className="text-white">
					You have been logged out. Please login again.
				</span>
			) : (
				<div className="bg-white bg-opacity-10 max-w-fit p-8 m-8 w-[33vw] min-w-fit justify-self-center lg:self-start lg:mt-10 drop-shadow-2xl">
					<Avatar image={avatar} />
					<div className="flex flex-col gap-2 mt-4 text-white">
						<span className="">{userInfo.username}</span>
					</div>
				</div>
			)}
		</>
	);
};

export default UserHeader;
