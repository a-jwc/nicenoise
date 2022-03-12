import { useEffect, useState } from "react";
import * as Tone from "tone";
import { PlayerContainer } from "../interfaces/interface";
import {
	initEffects,
	filter,
	updatePitchShift,
	setDistortionAmount,
	toggleEffect,
	setBitcrusherAmount,
	setReverbDecay,
	setChorusDepth,
	setDistortionOversample,
	setChorusFrequency,
	setChorusDelay,
	setChorusFeedback,
	setReverbPreDelay,
} from "../utils/effects";
import { loop, play, stop, volume } from "../utils/player";
import { EffectToggleButton } from "./EffectToggleButton";
import PlayerButton from "./PlayerButton";
import PlayerToggleButton from "./PlayerToggleButton";
import { VolumeSlider } from "./VolumeSlider";
import { PitchSlider } from "./PitchSlider";

export default function Player({ player }: PlayerContainer) {
	const [effects, setEffects] = useState({
		bitcrusher: new Tone.BitCrusher(),
		distortion: new Tone.Distortion(),
		chorus: new Tone.Chorus(),
		reverb: new Tone.Reverb(),
	});
	const [isLoop, setIsLoop] = useState(true);

	useEffect(() => {
		const {
			distortion,
			bitcrusher,
			chorus,
			reverb,
			// pitchShift,
		} = initEffects(player);

		// player.connect(pitchShift).toDestination();

		setEffects({
			...effects,
			bitcrusher: bitcrusher,
			distortion: distortion,
			chorus: chorus,
			reverb: reverb,
		});

		player.chain(distortion, bitcrusher, chorus, reverb, Tone.Destination);

		// setPitchShifter(pitchShift);
	}, [player]);

	return (
		<div className="border-4 p-4 m-4">
			<h1 className="text-center">Player</h1>
			<div className="grid grid-cols-3 gap-4 p-4 justify-items-center">
				<VolumeSlider
					player={player}
					name="Volume"
					fn={volume}
					min="-40"
					max="20"
					defaultValue="0"
					step="0.1"
				/>
				<div className="flex gap-2">
					<PlayerButton player={player} name={"Play"} fn={play} />
					<PlayerButton player={player} name={"Stop"} fn={stop} />
					<PlayerToggleButton
						player={player}
						name="Loop"
						fn={loop}
						state={isLoop}
						stateFn={setIsLoop}
					/>
				</div>
				{/* <PitchSlider
					shifter={pitchShifter}
					name={"Pitch"}
					fn={updatePitchShift}
					min="-12"
					max="12"
					defaultValue="0"
					step="1"
				/> */}
				<div className="row-start-2 col-start-2">
					<h2 className="text-center mt-2 mb-4">Effects</h2>
					<div className="flex xl:flex-nowrap flex-wrap gap-8">
						<div className="flex gap-6 flex-wrap place-content-center border-4 p-4 w-96">
							<h1>Distortion</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.distortion}
								toggleFn={toggleEffect}
							/>
							<label>
								Amount
								<input
									type={"number"}
									min="0"
									max="1.0"
									step="0.1"
									defaultValue={"0"}
									onChange={(e) => {
										console.log(e.target.value);
										setDistortionAmount(
											effects.distortion,
											parseFloat(e.target.value)
										);
									}}
									className="text-right"
								/>
							</label>
							<label>
								Oversample
								<select
									onChange={(e) => {
										setDistortionOversample(
											effects.distortion,
											e.target.value as OverSampleType
										);
									}}
								>
									<option value={"none"}>None</option>
									<option value={"2x"}>2x</option>
									<option value={"4x"}>4x</option>
								</select>
							</label>
						</div>
						<div className="flex gap-2 flex-wrap place-content-center border-4 p-4">
							<h1>BitCrusher</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.bitcrusher}
								toggleFn={toggleEffect}
							/>
							<label>
								Bits
								<input
									type={"number"}
									min="1"
									max="16"
									step="1"
									defaultValue={"1"}
									onChange={(e) => {
										console.log(e.target.value);
										setBitcrusherAmount(
											effects.bitcrusher,
											parseInt(e.target.value)
										);
									}}
									className="text-right"
								/>
							</label>
						</div>
						<div className="flex gap-2 flex-wrap place-content-center border-4 p-4">
							<h1>Chorus</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.chorus}
								toggleFn={toggleEffect}
							/>
							<div className="flex gap-4">
								<label>
									Depth
									<input
										type={"number"}
										min="0"
										max="1"
										step="0.1"
										defaultValue={"0"}
										onChange={(e) => {
											console.log(e.target.value);
											setChorusDepth(
												effects.chorus,
												parseFloat(e.target.value)
											);
										}}
										className="text-right"
									/>
								</label>
								<label>
									Frequency
									<input
										type={"number"}
										min="1"
										max="1000"
										step="1"
										defaultValue={"1"}
										onChange={(e) => {
											console.log(e.target.value);
											setChorusFrequency(
												effects.chorus,
												parseInt(e.target.value)
											);
										}}
										className="text-right"
									/>
								</label>
								<label>
									Delay(ms)
									<input
										type={"number"}
										min="0"
										max="100000"
										step="0"
										defaultValue={"0"}
										onChange={(e) => {
											console.log(e.target.value);
											setChorusDelay(effects.chorus, parseInt(e.target.value));
										}}
										className="text-right"
									/>
								</label>
								<label>
									Feedback
									<input
										type={"number"}
										min="0"
										max="1"
										step="0.1"
										defaultValue={"0"}
										onChange={(e) => {
											console.log(e.target.value);
											setChorusFeedback(
												effects.chorus,
												parseFloat(e.target.value)
											);
										}}
										className="text-right"
									/>
								</label>
							</div>
						</div>
						<div className="flex gap-6 flex-wrap place-content-center border-4 p-4">
							<h1>Reverb</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.reverb}
								toggleFn={toggleEffect}
							/>
							<label className="">
								Decay Time(s)
								<input
									type={"number"}
									min="1"
									max="60"
									step="1"
									defaultValue={"1"}
									onChange={(e) => {
										console.log(e.target.value);
										setReverbDecay(effects.reverb, parseInt(e.target.value));
									}}
									className="text-right"
								/>
							</label>
							<label className="">
								Delay (s)
								<input
									type={"number"}
									min="0"
									max="100000"
									step="1"
									defaultValue={"0"}
									onChange={(e) => {
										console.log(e.target.value);
										setReverbPreDelay(effects.reverb, parseInt(e.target.value));
									}}
									className="text-right"
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
