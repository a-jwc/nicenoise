import { useEffect, useState } from "react";

interface AuthorProp {
	id: number;
	title: string;
	published: boolean;
	authorName: string;
	authorId: number;
	sound: string;
	uploadDate: string;
	coverImage: string;
}

export default function Playback(soundInfo: AuthorProp) {
	const [soundUrl, setSoundUrl] = useState("");

	return (
		<div className="flex object-contain m-auto border-4 p-4 text-white w-fit">
			<audio controls className="object-contain m-auto">
				<source
					src={`http://localhost:8000/api/v1/sounds/${soundInfo.id}`}
					type="audio/mpeg"
				/>
			</audio>
			<div className="flex flex-col p-2 pl-12">
				<div className="font-bold w-40 overflow-hidden">{soundInfo.title}</div>
				<div className=" text-sm">{soundInfo.authorName}</div>
				<div className=" text-xs">{new Date(soundInfo.uploadDate).toDateString()}</div>
			</div>
		</div>
	);
}
