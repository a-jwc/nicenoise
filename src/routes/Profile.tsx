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
	}, [apiData]);

	return (
		<Container>
			<div className="grid grid-cols-2 m-12">
				{isLoading && <span className="text-white">Loading...</span>}
				{!isLoading && error ? (
					<span className="text-white">Error</span>
				) : (
					<div>
						<div>
							<div>
								<Avatar image={userInfo.avatar} />
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
