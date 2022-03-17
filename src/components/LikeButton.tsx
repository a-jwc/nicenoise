import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function LikeButton({
	soundId,
	likeCount,
}: {
	soundId: number;
	likeCount: number;
}) {
	const [numLikes, setNumLikes] = useState(likeCount);

	const updateLikes = () => {
		fetch(`http://localhost:8000/api/v1/sounds/like/${soundId}`, {
			method: "POST",
			mode: "cors",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw Error("Liked failed");
				return res.json();
			})
			.then((json) => {
        console.log(json.likesCount)
				setNumLikes(json.likesCount);
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	return (
		<div className="flex border-2 h-fit w-fit ml-4">
			<button
				className="p-1"
				onClick={(e) => {
					console.log("liked", soundId);
					updateLikes();
				}}
			>
				<AiOutlineHeart />
			</button>
			<p className="px-1 pb-0.5">{numLikes}</p>
		</div>
	);
}
