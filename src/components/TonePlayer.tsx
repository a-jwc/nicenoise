import { useEffect, useState } from "react";
import * as Tone from "tone";
import { PlayerContainer } from "../interfaces/interface";
import {
	initEffects,
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
	connectFilter,
	disconnectFilter,
	setFilterFrequency,
	setFilterType,
	setFilterRolloff,
} from "../utils/effects";
import { loop, play, stop, volume } from "../utils/player";
import { EffectToggleButton } from "./EffectToggleButton";
import PlayerButton from "./PlayerButton";
import PlayerToggleButton from "./PlayerToggleButton";
import { VolumeSlider } from "./VolumeSlider";
import { PitchSlider } from "./PitchSlider";
import { ConnectToggleButton } from "./ConnectToggleButton";
import { NumberInput } from "./NumberInput";
import { BiquadFilters, FilterRollOffs } from "../utils/options";
import { FilterRollOff, Recorder } from "tone";

export default function TonePlayer({ player }: PlayerContainer) {
	const [effects, setEffects] = useState({
		bitcrusher: new Tone.BitCrusher(),
		distortion: new Tone.Distortion(),
		chorus: new Tone.Chorus(),
		reverb: new Tone.Reverb(),
		filter: new Tone.Filter(),
	});
	const [isLoop, setIsLoop] = useState(true);
	const [recorder, setRecorder] = useState<Tone.Recorder>(new Tone.Recorder());
	const [isRecorded, setIsRecorded] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordingUrl, setRecordingUrl] = useState("");
	const [recording, setRecording] = useState("Record");

	useEffect(() => {
		const {
			distortion,
			bitcrusher,
			chorus,
			reverb,
			filter,
			// pitchShift,
		} = initEffects(player);

		// player.connect(pitchShift).toDestination();

		setEffects({
			...effects,
			bitcrusher: bitcrusher,
			distortion: distortion,
			chorus: chorus,
			reverb: reverb,
			filter: filter,
		});

		const chainedPlayer = player.chain(
			distortion,
			bitcrusher,
			chorus,
			reverb,
			Tone.Destination
		);
		Tone.Destination.connect(recorder);

		// setPitchShifter(pitchShift);
	}, [player]);

	const mapBiquadFilterOption = BiquadFilters.map((filter) => (
		<option value={filter}>{filter}</option>
	));

	const mapFilterRolloffOption = FilterRollOffs.map((rolloff) => (
		<option value={rolloff}>{rolloff}</option>
	));

	return (
		<div className="flex flex-col border-4 p-4 m-4">
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
					<div className="flex 2xl:flex-nowrap flex-wrap gap-8">
						<div className="flex gap-6 flex-wrap place-content-center border-4 p-4 w-96">
							<h1>Distortion</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.distortion}
								toggleFn={toggleEffect}
							/>
							<NumberInput
								name="Amount"
								min="0"
								max="1.0"
								step="0.1"
								defaultValue="0"
								setEffect={setDistortionAmount}
								effect={effects.distortion}
							/>
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
							<NumberInput
								name="Bits"
								min="1"
								max="16"
								step="1"
								defaultValue="1"
								setEffect={setBitcrusherAmount}
								effect={effects.bitcrusher}
							/>
						</div>
						<div className="flex gap-2 flex-wrap place-content-center border-4 p-4">
							<h1>Chorus</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.chorus}
								toggleFn={toggleEffect}
							/>
							<div className="flex gap-4">
								<NumberInput
									name="Depth"
									min="0"
									max="1"
									step="0.1"
									defaultValue="0"
									setEffect={setChorusDepth}
									effect={effects.chorus}
								/>
								<NumberInput
									name="Frequency(Hz)"
									min="1"
									max="20000000"
									step="1"
									defaultValue="1"
									setEffect={setChorusFrequency}
									effect={effects.chorus}
								/>
								<NumberInput
									name="Delay(ms)"
									min="0"
									max="100000"
									step="1"
									defaultValue="0"
									setEffect={setChorusDelay}
									effect={effects.chorus}
								/>
								<NumberInput
									name="Feedback"
									min="0"
									max="1"
									step="0.1"
									defaultValue="0"
									setEffect={setChorusFeedback}
									effect={effects.chorus}
								/>
							</div>
						</div>
						<div className="flex gap-6 flex-wrap place-content-center border-4 p-4">
							<h1>Reverb</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.reverb}
								toggleFn={toggleEffect}
							/>
							<NumberInput
								name="Decay Time(s)"
								min="1"
								max="60"
								step="1"
								defaultValue="1"
								setEffect={setReverbDecay}
								effect={effects.reverb}
							/>
							<NumberInput
								name="Delay(s)"
								min="0"
								max="100000"
								step="1"
								defaultValue="0"
								setEffect={setReverbPreDelay}
								effect={effects.reverb}
							/>
						</div>
						<div className="flex gap-6 flex-wrap place-content-center border-4 p-4">
							<h1>Filter</h1>
							<ConnectToggleButton
								player={player}
								name="Connect"
								effect={effects.filter}
								connectFn={connectFilter}
								disconnectFn={disconnectFilter}
							/>
							<label className="">
								Frequency(Hz)
								<input
									type={"range"}
									min="20"
									max="20000000"
									step="1"
									defaultValue={"5000"}
									onChange={(e) => {
										setFilterFrequency(
											effects.filter,
											parseInt(e.target.value)
										);
									}}
								/>
							</label>
							<label>
								Filter Type
								<select
									onChange={(e) => {
										setFilterType(
											effects.filter,
											e.target.value as BiquadFilterType
										);
									}}
								>
									{mapBiquadFilterOption}
								</select>
							</label>
							<label>
								Rolloff db
								<select
									onChange={(e) => {
										setFilterRolloff(
											effects.filter,
											parseInt(e.target.value) as FilterRollOff
										);
									}}
								>
									{mapFilterRolloffOption}
								</select>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div>
				<label
					className={`flex flex-col place-self-center border-2 border-neutral-400 p-4 w-24 h-12 mx-auto text-center hover:cursor-pointer mb-12 hover:bg-red-300 transition-colors ${
						isRecording ? "bg-red-300" : "bg-blue-300"
					}`}
				>
					{recording}
					<input
						type={"submit"}
						value={recording}
						onClick={async (e) => {
							e.preventDefault();
							console.log(recorder.state);
							if (recorder.state === "stopped") {
								recorder.start();
								setRecording("Recording");
								setIsRecording(true);
							} else {
								const recording = await recorder.stop();
								const url = URL.createObjectURL(recording);
								setRecording("Record");
								setIsRecording(false);
								setIsRecorded(true);
								setRecordingUrl(url);
							}
						}}
						className="mt-2 opacity-0 hover:cursor-pointer"
					/>
				</label>
				<div className="text-center">
					{isRecorded && (
						<a
							href={`${recordingUrl}`}
							download="recording.webm"
							className="text-red-500"
						>
							Download
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
