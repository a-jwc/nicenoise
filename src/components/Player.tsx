import { useEffect, useState } from "react";
import * as Tone from "tone";
import {
	PlayerContainer,
	ToggleButtonProp,
	SliderProp,
	EffectToggleButtonProp,
} from "../interfaces/interface";
import {
	initEffects,
  connectEffect,
  disconnectEffect,
	filter,
} from "../utils/effects";
import { loop, play, stop, volume } from "../utils/player";
import { EffectSlider } from "./EffectSlider";
import { EffectToggleButton } from "./EffectToggleButton";
import PlayerButton from "./PlayerButton";
import PlayerToggleButton from "./PlayerToggleButton";

export default function Player({ player }: PlayerContainer) {
	const [effects, setEffects] = useState({
		crusher: new Tone.BitCrusher(),
		distortion: new Tone.Distortion(),
		chorus: new Tone.Chorus(),
		isChorus: false,
	});
	const [isLoop, setIsLoop] = useState(true);
	const [isDistorted, setIsDistorted] = useState(false);
  const [isBitcrushed, setIsBitcrushed] = useState(false);
  const [isChorus, setIsChorus] = useState(false);

	useEffect(() => {
		player.toDestination();
		const { distort, bitcrush, chorus } = initEffects(player);
		setEffects({
			...effects,
			crusher: bitcrush,
			distortion: distort,
			chorus: chorus,
		});
	}, []);

	return (
		<div className="border-4 p-4 m-4">
			<h1 className="text-center">Player</h1>
			<div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 justify-items-center">
				<EffectSlider
					player={player}
					name={"Volume"}
					fn={volume}
					min={"-40"}
					max="20"
					defaultValue="0"
					step="0.1"
				/>
				<div className="flex gap-2">
					<PlayerButton player={player} name={"Play"} fn={play} />
					<PlayerButton player={player} name={"Stop"} fn={stop} />
					<PlayerToggleButton
						player={player}
						name={"Loop"}
						fn={loop}
						styles={""}
						state={isLoop}
						stateFn={setIsLoop}
					/>
				</div>
        <div className=" col-start-2">Effects</div>
				<div className="flex gap-2 flex-wrap row-start-3">
					<EffectToggleButton
						player={player}
						name="Distortion"
						isState={isDistorted}
						stateFn={setIsDistorted}
						stateEffect={effects.distortion}
						connectFn={connectEffect}
						disconnectFn={disconnectEffect}
					/>
				</div>
        <div className="flex gap-2 flex-wrap row-start-3">
					<EffectToggleButton
						player={player}
						name="Bitcrusher"
						isState={isBitcrushed}
						stateFn={setIsBitcrushed}
						stateEffect={effects.crusher}
						connectFn={connectEffect}
						disconnectFn={disconnectEffect}
					/>
				</div>
        <div className="flex gap-2 flex-wrap row-start-3">
					<EffectToggleButton
						player={player}
						name="Chorus"
						isState={isChorus}
						stateFn={setIsChorus}
						stateEffect={effects.chorus}
						connectFn={connectEffect}
						disconnectFn={disconnectEffect}
					/>
				</div>
				{/* <EffectSlider
					player={player}
					name={"Distortion"}
					fn={distortion}
					min="0.0"
					max="1.0"
					defaultValue="0.0"
					step="0.1"
				/>
				<EffectSlider
					player={player}
					name={"Bitcrusher"}
					fn={bitcrusher}
					min="0.0"
					max="1.0"
					defaultValue="0.0"
					step="0.1"
				/> */}
				{/* <PlayerButton player={player} name="filter" fn={filter} /> */}
			</div>
		</div>
	);
}
