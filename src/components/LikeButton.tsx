import { AiOutlineHeart } from "react-icons/ai";
import useUpdateLikes from "../hooks/useUpdateLikes";

export default function LikeButton({
	soundId,
	likeCount,
}: {
	soundId: number;
	likeCount: number;
}) {
	const { numLikes, updateLikes } = useUpdateLikes({
		soundId,
		likeCount,
	});

	return (
		<div className="flex border-2 h-fit w-fit ml-4">
			<button
				className="p-1"
				onClick={(e) => {
					updateLikes();
				}}
			>
				<AiOutlineHeart />
			</button>
			<p className="px-1 pb-0.5">{numLikes}</p>
		</div>
	);
}
