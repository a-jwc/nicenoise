import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import Feed from "../components/Feed";
import Playback from "../components/Playback";
import Avatar from "../components/profile/Avatar";
import UserHeader from "../components/profile/UserHeader";
import UserLikes from "../components/profile/UserLikes";
import UserSounds from "../components/profile/UserSounds";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/interface";

export default function Profile() {
	const params = useParams();
	const { isLoading, apiData, error } = useFetch<User>(
		`http://localhost:8000/api/v1/user/${params.username}`
	);

	const [userInfo, setUserInfo] = useState<User>({
		username: "",
		email: "",
		avatar: null,
		id: 0,
		likes: [],
		sounds: [],
		followedBy: [],
		following: [],
	});

	useEffect(() => {
		console.log(userInfo);
		if (apiData) {
			setUserInfo({
				...userInfo,
				username: apiData.username,
				email: apiData.email,
				avatar: apiData.avatar,
				id: apiData.id,
				likes: apiData.likes,
				sounds: apiData.sounds,
				followedBy: apiData.followedBy,
				following: apiData.following,
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
		userInfo.followedBy,
		userInfo.following,
	]);

	return (
		<Container>
			<div className="lg:grid lg:auto-cols-min lg:grid-flow-col flex flex-col gap-6 place-items-center items-center lg:max-w-fit">
				<UserHeader userInfo={userInfo} isLoading={isLoading} error={error} />
				<div className="text-white">
					<UserSounds userInfo={userInfo} />
					<UserLikes userInfo={userInfo} />
				</div>
			</div>
		</Container>
	);
}
