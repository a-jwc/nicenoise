import Playback from "./Playback";
import { useEffect, useState } from "react";
import { useGetOrderedSounds, useGetSoundInfo } from "../hooks/useGetFeed";

export default function Feed() {
	const [sounds, setSounds] = useState<JSX.Element[]>([]);
	const order = "desc";

	const soundInfo = useGetSoundInfo(
		`http://localhost:8000/api/v1/sounds?order=${order}`
	);
  const orderedSound = useGetOrderedSounds(soundInfo);

	return <div className="flex flex-col gap-4 object-contain">{orderedSound}</div>;
}
