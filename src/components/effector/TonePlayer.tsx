import { useEffect, useState } from "react";
import * as Tone from "tone";
import { PlayerContainer } from "../../interfaces/interface";
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
} from "../../utils/effects";
import { loop, play, stop, volume } from "../../utils/player";
import { EffectToggleButton } from "./EffectToggleButton";
import PlayerButton from "./PlayerButton";
import PlayerToggleButton from "./PlayerToggleButton";
import { VolumeSlider } from "./VolumeSlider";
import { PitchSlider } from "./PitchSlider";
import { ConnectToggleButton } from "./ConnectToggleButton";
import { NumberInput } from "./NumberInput";
import {
	BiquadFilters,
	distortionOversample,
	FilterRollOffs,
} from "../../utils/options";
import EffectSelectInput from "./EffectSelectInput";
import Header1 from "../elements/Header1";
import Recorder from "./Recorder";

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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [player, recorder]);

	return (
		<div className="flex flex-col border-4 lg:p-4 p-2 m-4 text-white object-contain">
			<Header1 name="Player" />
			<div className="lg:grid lg:grid-cols-3 flex flex-col gap-4 2xs:p-4 items-center lg:place-items-center">
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
					<Header1 name="Effects" styles="mb-4 mt-2" />
					<div className="flex xl:flex-nowrap flex-wrap place-content-center items-center gap-8 lg:w-fit w-[33vw] pb-4">
						<div className="effect w-96">
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
							<EffectSelectInput
								name="Oversample"
								setEffect={setDistortionOversample}
								effect={effects.distortion}
								options={distortionOversample}
							/>
						</div>
						<div className="effect">
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
						<div className="effect">
							<h1>Chorus</h1>
							<EffectToggleButton
								name="Mute"
								effect={effects.chorus}
								toggleFn={toggleEffect}
							/>
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
						<div className="flex gap-6 flex-wrap place-content-center border-4 xs:p-4 p-2">
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
						<div className="flex gap-6 flex-wrap place-content-center border-4 xs:p-4 p-2">
							<h1>Filter</h1>
							<ConnectToggleButton
								player={player}
								name="Connect"
								effect={effects.filter}
								connectFn={connectFilter}
								disconnectFn={disconnectFilter}
							/>
							<label className="text-center">
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
									className="max-w-[150px] w-3/4"
								/>
							</label>
							<EffectSelectInput
								name="Filter Type"
								setEffect={setFilterType}
								effect={effects.filter}
								options={BiquadFilters}
							/>
							<EffectSelectInput
								name="Rolloff db"
								setEffect={setFilterRolloff}
								effect={effects.filter}
								options={FilterRollOffs}
							/>
						</div>
					</div>
				</div>
			</div>
			<Recorder recorder={recorder} />
		</div>
	);
}
