import { useEffect, useState } from "react";
import Playback from "../components/Playback";
import { Sound } from "../interfaces/interface";

export const useGetSoundInfo = (url: string) => {
	const [soundInfo, setSoundInfo] = useState<Sound[]>([]);

	const getSoundInfo = () => {
		fetch(url)
			.then((res) => {
				if (!res.ok) throw Error("Could not get sound info");
				return res.json();
			})
			.then((sounds) => setSoundInfo(sounds))
			.catch((err) => {
				console.error(err);
				throw Error("Error getting sound info");
			});
	};

	useEffect(() => {
		getSoundInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return soundInfo;
};

export const useGetOrderedSounds = (soundInfo: Sound[]) => {
	return soundInfo.map((sound) => <Playback key={sound.id} {...sound} />);
};
