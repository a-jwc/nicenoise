import { useEffect, useState } from "react";
import Container from "../components/Container";
import Feed from "../components/Feed";
import Playback from "../components/Playback";
import Avatar from "../components/profile/Avatar";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/interface";

const order = "desc";

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

    if (userInfo.avatar) {
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
          throw err;
        });
    }
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
			<div className="lg:grid lg:auto-cols-min lg:grid-flow-col flex flex-col gap-6 place-items-center items-center lg:max-w-fit">
				{isLoading && <span className="text-white">Loading...</span>}
				{!isLoading && error ? (
					<span className="text-white">
						You have been logged out. Please login again.
					</span>
				) : (
					<div className="bg-white bg-opacity-10 max-w-fit p-8 m-8 w-[33vw] min-w-fit justify-self-center lg:self-start lg:mt-10 drop-shadow-2xl">
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
					<h1 className="font-bold text-xl ml-8">Sounds</h1>
					{userInfo.sounds.length !== 0 ? (
						<Feed
							url={`http://localhost:8000/api/v1/sounds/user/${userInfo.id}?order=${order}`}
						/>
					) : (
						<div className="feed">No sounds yet!</div>
					)}
					<h1 className="font-bold text-xl ml-8">Likes</h1>
					{userInfo.likes.length !== 0 ? (
						<div className="feed">
							{userInfo.likes.map((soundInfo) => {
								return <Playback key={soundInfo.id} {...soundInfo} />;
							})}
						</div>
					) : (
						<div className="feed">No likes yet!</div>
					)}
				</div>
			</div>
		</Container>
	);
}
