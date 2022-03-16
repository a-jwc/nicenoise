import { useEffect, useState } from "react";
import Playback from "../components/Playback";
import { AuthorProp } from "../interfaces/interface";

export const useGetSoundInfo = (url: string) => {
	const [soundInfo, setSoundInfo] = useState<AuthorProp[]>([]);

  useEffect(() => {
    fetch(url).then(res => {
      if (!res.ok) throw Error("Could not get sound info")
      return res.json();
    }).then(sounds => {
      setSoundInfo(sounds);
    }).catch(err => {
      console.error(err)
      throw Error("Error getting sound info")
    })
  }, [])

  return soundInfo;
};

export const useGetOrderedSounds = (soundInfo: AuthorProp[]) => {
	return soundInfo.map((sound) => <Playback key={sound.id} {...sound} />);
};
