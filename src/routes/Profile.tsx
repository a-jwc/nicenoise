import { useEffect, useState } from "react";
import Container from "../components/Container";
import Feed from "../components/Feed";
import Avatar from "../components/profile/Avatar";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/interface";

export default function Profile() {
	const { isLoading, apiData, error } = useFetch<User>(
		"http://localhost:8000/api/v1/user/profile"
	);

	const [userInfo, setUserInfo] = useState({
		username: "",
		email: "",
		avatar: null,
		id: 0,
	});
	const [avatar, setAvatar] = useState<Blob>();

	const order = "desc";

	useEffect(() => {
		if (apiData !== undefined) {
			const data: User = apiData;
			setUserInfo({
				...userInfo,
				username: apiData.username,
				email: apiData.email,
				avatar: apiData.avatar,
				id: parseInt(apiData.id),
			});
		}
		fetch("http://localhost:8000/api/v1/user/get-avatar", {
			mode: "cors",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw Error("Response not ok");
				return res.blob();
			})
			.then((blob) => {
				if (blob !== undefined) setAvatar(blob);
			})
			.catch((err) => {
				console.error(err);
				throw Error("Could not get avatar");
			});
	}, [apiData]);

	return (
		<Container>
			<div className="lg:grid lg:grid-cols-2 flex flex-col gap-8 items-center place-items-center m-12">
				{isLoading && <span className="text-white">Loading...</span>}
				{!isLoading && error ? (
					<span className="text-white">Error</span>
				) : (
					<div className="bg-white bg-opacity-10 max-w-fit p-8 w-[33vw] min-w-fit justify-self-start">
						<div>
							<div>
								<Avatar image={avatar} />
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-4 text-white">
							<span className="">{userInfo.username}</span>
						</div>
					</div>
				)}
				<div>
					{userInfo.id !== 0 ? (
						<Feed
							url={`http://localhost:8000/api/v1/sounds/user/${userInfo.id}?order=${order}`}
						/>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</Container>
	);
}
