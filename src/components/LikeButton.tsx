import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import GenericDialog from "./GenericDialog";

export default function LikeButton({
	soundId,
	likeCount,
}: {
	soundId: number;
	likeCount: number;
}) {
	const [dialog, setDialog] = useState(<></>);
	const [numLikes, setNumLikes] = useState(likeCount);
	const [error, setError] = useState();

	const updateLikes = () => {
		fetch(`http://localhost:8000/api/v1/sounds/like/${soundId}`, {
			method: "POST",
			mode: "cors",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					setDialog(
						<GenericDialog
							title="Please login to like"
							description="You must be logged in to like."
						/>
					);
					setTimeout(() => setDialog(<></>), 4000);
					throw Error("Like failed");
				}
				return res.json();
			})
			.then((json) => setNumLikes(json.likesCount))
			.catch((err) => {
				setError(err);
				throw err;
			});
	};

	return (
		<div className="flex border-2 h-fit w-fit ml-4">
			<button
				className="p-1"
				onClick={() => {
					updateLikes();
				}}
			>
				<AiOutlineHeart />
			</button>
			<p className="px-1 pb-0.5">{numLikes}</p>
			{dialog}
		</div>
	);
}
