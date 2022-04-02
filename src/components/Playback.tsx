import { memo } from "react";
import { Sound } from "../interfaces/interface";
import LikeButton from "./LikeButton";
import ReactAudioPlayer from "react-audio-player";
import { Link } from "react-router-dom";

const Playback = (soundInfo: Sound) => {
	return (
		<div className="flex flex-col sm:flex-row object-contain m-auto p-6 text-white min-w-fit lg:items-center items-start drop-shadow-2xl bg-white bg-opacity-10 playback">
			<ReactAudioPlayer
				// src={`http://localhost:8000/api/v1/sounds/${soundInfo.id}`}
				className="block object-contain m-auto w-[33vw] 3xs:min-w-[12rem] 2xs:min-w-[15rem]"
				preload="metadata"
				controls
				controlsList="nodownload"
			/>
			<div className="flex flex-row items-center">
				<div className="flex flex-col p-2 lg:pl-12 pl-4 w-48">
					<div className="font-bold overflow-hidden">{soundInfo.title}</div>
					<div className="text-sm">
						<Link to={`/${soundInfo.authorName}`}>{soundInfo.authorName}</Link>
					</div>
					<div className="text-xs">
						{new Date(soundInfo.uploadDate).toDateString()}
					</div>
				</div>
				<LikeButton soundId={soundInfo.id} likeCount={soundInfo.likesCount} />
			</div>
		</div>
	);
};

export default memo(Playback);
