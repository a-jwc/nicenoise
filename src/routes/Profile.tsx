import { useEffect, useState } from "react";
import Container from "../components/Container";
import Feed from "../components/Feed";
import Playback from "../components/Playback";
import Avatar from "../components/profile/Avatar";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/interface";
import { Sound } from "../interfaces/interface";

export default function Profile() {
	const { isLoading, apiData, error } = useFetch<User>(
		"http://localhost:8000/api/v1/user/profile"
	);

	const [userInfo, setUserInfo] = useState<User>({
		username: "",
		email: "",
		avatar: null,
		id: 0,
		likes: [],
		sounds: [],
	});
	const [avatar, setAvatar] = useState<Blob>();

	const order = "desc";

	useEffect(() => {
		if (apiData !== undefined) {
			setUserInfo({
				...userInfo,
				username: apiData.username,
				email: apiData.email,
				avatar: apiData.avatar,
				id: apiData.id,
				likes: apiData.likes,
				sounds: apiData.sounds,
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		apiData,
		userInfo.avatar,
		userInfo.email,
		userInfo.id,
		userInfo.username,
		userInfo.likes,
		userInfo.sounds,
	]);

	return (
		<Container>
			<div className="lg:grid lg:grid-cols-2 flex flex-col gap-8 items-center place-items-center m-12">
				{isLoading && <span className="text-white">Loading...</span>}
				{!isLoading && error ? (
					<span className="text-white">
						You have been logged out. Please login again.
					</span>
				) : (
					<div className="bg-white bg-opacity-10 max-w-fit p-8 w-[33vw] min-w-fit justify-self-start lg:self-start lg:mt-10">
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
				<div className="text-white">
					<div>
						<h1 className="font-bold text-xl ml-4">Sounds</h1>
						{userInfo.sounds.length !== 0 ? (
							<Feed
								url={`http://localhost:8000/api/v1/sounds/user/${userInfo.id}?order=${order}`}
							/>
						) : (
							<div className="flex flex-col gap-4 object-contain bg-white bg-opacity-10 p-4 m-4 min-w-fit">
								No sounds yet!
							</div>
						)}
					</div>
					<div>
						<h1 className="font-bold text-xl ml-4">Likes</h1>
						{userInfo.likes.length !== 0 ? (
							<div className="flex flex-col gap-4 object-contain bg-white bg-opacity-10 p-4 m-4 min-w-fit">
								{userInfo.likes.map((soundInfo) => {
									return <Playback {...soundInfo.sound} />;
								})}
							</div>
						) : (
							<div className="flex flex-col gap-4 object-contain bg-white bg-opacity-10 p-4 m-4 min-w-fit">
								No likes yet!
							</div>
						)}
					</div>
				</div>
			</div>
		</Container>
	);
}
