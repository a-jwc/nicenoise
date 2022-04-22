import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../interfaces/interface";
import Button from "../elements/Button";
import Avatar from "./Avatar";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../../App";

interface FollowingUser {
	username: string;
}

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
	const context: ContextType = useOutletContext();
	const [isFollowed, setIsFollowed] = useState(false);

	const follow = () => {
		if (params.username === context.username) {
			alert("Cannot follow yourself :)");
		}
		fetch(`http://localhost:8000/api/v1/user/follow/${params.username}`, {
			method: "POST",
			mode: "cors",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw Error("Response not ok");
				return res;
			})
			.catch((err) => {
				throw err;
			});
		setIsFollowed(true);
	};

	const unfollow = () => {
		fetch(`http://localhost:8000/api/v1/user/unfollow/${params.username}`, {
			method: "POST",
			mode: "cors",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw Error("Response not ok");
				return res;
			})
			.catch((err) => {
				throw err;
			});
		setIsFollowed(false);
	};

	useEffect(() => {
		console.log(userInfo);
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

	useEffect(() => {
		fetch(`http://localhost:8000/api/v1/user/${context.username}`, {
			mode: "cors",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw Error("Response not ok");
				return res.json();
			})
			.then((res) => {
				console.log(res);
				const following: FollowingUser[] = res.following;
				if (
					params.username &&
					following.some((user) => user.username === params.username)
				) {
					setIsFollowed(true);
				}
			})
			.catch((err) => {
				throw err;
			});
	}, [context.username, params.username]);

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
						<span className="text-xl text-center mt-4">
							{userInfo.username}
						</span>
						<>
							{isFollowed ? (
								<Button
									name="Unfollow"
									color=""
									onClick={unfollow}
									styles="border"
								/>
							) : (
								<Button
									name="Follow"
									color=""
									onClick={follow}
									styles="border"
								/>
							)}
						</>
						<div className="flex place-content-evenly">
							<div className="flex flex-col place-items-center">
								<div>Followers</div>
								<span>{userInfo.followedBy.length}</span>
							</div>
							<div className="flex flex-col place-items-center">
								<div>Following</div>
								<span>{userInfo.following.length}</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UserHeader;
