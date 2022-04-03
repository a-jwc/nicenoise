import { User } from "../../interfaces/interface";
import Feed from "../Feed";

const order = "desc";

const UserSounds = ({ userInfo }: { userInfo: User }) => {
	return (
		<>
			<h1 className="font-bold text-xl ml-8">sounds</h1>
			{userInfo.sounds.length !== 0 ? (
				<Feed
					url={`http://localhost:8000/api/v1/sounds/user/${userInfo.id}?order=${order}`}
				/>
			) : (
				<div className="feed">No sounds yet!</div>
			)}
		</>
	);
};

export default UserSounds;
