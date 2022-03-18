import { useState } from "react";

export default function useUpdateLikes({
	soundId,
	likeCount,
}: {
	soundId: number;
	likeCount: number;
}) {
	const [numLikes, setNumLikes] = useState(likeCount);
	const [error, setError] = useState();

	const updateLikes = () => {
		fetch(`http://localhost:8000/api/v1/sounds/like/${soundId}`, {
			method: "POST",
			mode: "cors",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) throw Error("Like failed");
				return res.json();
			})
			.then((json) => setNumLikes(json.likesCount))
			.catch((err) => {
				setError(err);
				throw err;
			});
	};

	return { numLikes, error, updateLikes };
}
