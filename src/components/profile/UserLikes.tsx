import { User } from "../../interfaces/interface";
import Playback from "../Playback";

const UserLikes = ({ userInfo }: { userInfo: User }) => {
	return (
		<>
			<h1 className="font-bold text-xl ml-8">likes</h1>
			{userInfo.likes.length !== 0 ? (
				<div className="feed">
					{userInfo.likes.map((soundInfo) => {
						return <Playback key={soundInfo.id} {...soundInfo} />;
					})}
				</div>
			) : (
				<div className="feed">No likes yet!</div>
			)}
		</>
	);
};

export default UserLikes;
