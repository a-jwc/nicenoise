import { useEffect, useState } from "react";
import * as Tone from "tone";
import {
	PlayerContainer,
	ToggleButtonProp,
	SliderProp,
} from "../interfaces/interface";
import {
	distortion,
	filter,
	initEffects,
	toggleBitcrusher,
} from "../utils/effects";
import { loop, play, stop, volume } from "../utils/player";
import PlayerButton from "./PlayerButton";
import PlayerToggleButton from "./PlayerToggleButton";

export default function Player({ player }: PlayerContainer) {
	const [effects, setEffects] = useState({
		crusher: new Tone.BitCrusher(),
		isCrushed: false,
	});
	const [isLoop, setIsLoop] = useState(true);

	useEffect(() => {
		player.toDestination();
		const { distort, bitcrush, chorus } = initEffects(player);
		setEffects({ ...effects, crusher: bitcrush });
		player.chain(distort, bitcrush, chorus, Tone.Destination);
	}, []);

	return (
		<div className="border-4">
			<h1 className="text-center">Player</h1>
			<div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
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
				<EffectSlider
					player={player}
					name={"Volume"}
					fn={volume}
					min={"-40"}
					max="20"
					defaultValue="0"
					step="0.1"
				/>
				<Bitcrush
					player={player}
					name="Bitcrusher"
					fn={toggleBitcrusher}
					state={effects}
					stateFn={setEffects}
				/>
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

function EffectSlider({
	player,
	name,
	fn,
	min,
	max,
	defaultValue,
	step,
}: SliderProp) {
	return (
		<div>
			<label>
				{name}
				<input
					type="range"
					min={min}
					max={max}
					defaultValue={defaultValue}
					step={step}
					onChange={(e) => {
						fn(player, parseFloat(e.target.value));
					}}
				/>
			</label>
		</div>
	);
}

function Bitcrush({
	player,
	name,
	fn,
	styles,
	state,
	stateFn,
}: ToggleButtonProp) {
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					fn(player, state.crusher);
					if (stateFn !== undefined) {
						stateFn({ ...state, isCrushed: !state.isCrushed });
					}
				}}
				className={`border-2 border-black p-1 hover:bg-red-300 ${styles} ${
					!state.isCrushed ? "bg-red-300" : ""
				}`}
			>
				{name}
			</button>
		</div>
	);
}
