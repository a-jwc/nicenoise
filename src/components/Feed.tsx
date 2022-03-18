import { useState } from "react";
import { useGetOrderedSounds, useGetSoundInfo } from "../hooks/useGetFeed";

export default function Feed({ url }: { url: string }) {
	const soundInfo = useGetSoundInfo(url);
	const orderedSound = useGetOrderedSounds(soundInfo);

	return (
		<div className="feed">{orderedSound}</div>
	);
}
