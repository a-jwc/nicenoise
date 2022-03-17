import { useState } from "react";
import { useGetOrderedSounds, useGetSoundInfo } from "../hooks/useGetFeed";

export default function Feed({ url }: { url: string }) {
	const soundInfo = useGetSoundInfo(url);
	const orderedSound = useGetOrderedSounds(soundInfo);

	return (
		<div className="flex flex-col gap-4 object-contain bg-white bg-opacity-10 p-4 m-4 min-w-fit">{orderedSound}</div>
	);
}
