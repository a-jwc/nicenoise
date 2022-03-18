import { Sound } from "../interfaces/interface";
import LikeButton from "./LikeButton";

export default function Playback(soundInfo: Sound) {
	return (
		<div className="flex flex-col lg:flex-row object-contain m-auto border-4 p-4 text-white w-[33vw] min-w-fit lg:items-center items-start">
			<audio controls className="object-contain m-auto 3xs:min-w-[12rem] 2xs:min-w-[15rem] w-[33vw]">
				<source
					src={`http://localhost:8000/api/v1/sounds/${soundInfo.id}`}
					type="audio/mpeg"
				/>
			</audio>
			<div className="flex flex-col p-2 lg:pl-12 pl-4">
				<div className="font-bold w-[50vw] lg:w-[13vw] overflow-hidden">{soundInfo.title}</div>
				<div className="text-sm">{soundInfo.authorName}</div>
				<div className="text-xs">
					{new Date(soundInfo.uploadDate).toDateString()}
				</div>
			</div>
			<LikeButton soundId={soundInfo.id} likeCount={soundInfo.likesCount} />
		</div>
	);
}
