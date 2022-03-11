import { useEffect, useState } from "react";
import * as Tone from "tone";
import { PlayerContainer } from "../interfaces/interface";
import {
	initEffects,
	connectChannelEffect,
	muteChannelEffect,
	filter,
	setChannelVolume,
	updatePitchShift,
} from "../utils/effects";
import { loop, play, stop, volume } from "../utils/player";
import { EffectSlider } from "./EffectSlider";
import { EffectToggleButton } from "./EffectToggleButton";
import PlayerButton from "./PlayerButton";
import PlayerToggleButton from "./PlayerToggleButton";
import { VolumeSlider } from "./VolumeSlider";
import { PitchSlider } from "./PitchSlider";

export default function Player({ player }: PlayerContainer) {
	const [effects, setEffects] = useState({
		crusher: new Tone.BitCrusher(),
		distortion: new Tone.Distortion(),
		chorus: new Tone.Chorus(),
	});
	const [isLoop, setIsLoop] = useState(true);
	const [isDistorted, setIsDistorted] = useState(true);
	const [isBitcrushed, setIsBitcrushed] = useState(true);
	const [isChorus, setIsChorus] = useState(true);
	const [isReverb, setIsReverb] = useState(true);

	const [pitchShifter, setPitchShifter] = useState(new Tone.PitchShift());

	const [distortionChannel, setDistortionChannel] = useState<Tone.Channel>(
		new Tone.Channel()
	);
	const [bitcrusherChannel, setBitcrusherChannel] = useState<Tone.Channel>(
		new Tone.Channel()
	);
	const [chorusChannel, setChorusChannel] = useState<Tone.Channel>(
		new Tone.Channel()
	);
	const [reverbChannel, setReverbChannel] = useState<Tone.Channel>(
		new Tone.Channel()
	);

	const [playerChannel, setPlayerChannel] = useState<Tone.Channel>();

	useEffect(() => {
		const playerChannel = new Tone.Channel().toDestination();
		player.connect(playerChannel);
		const {
			distort,
			distortionChannel,
			bitcrusherChannel,
			chorusChannel,
			reverbChannel,
			bitcrusher,
			chorus,
			pitchShift,
		} = initEffects(player);

		// player.connect(pitchShift).toDestination();

		setEffects({
			...effects,
			crusher: bitcrusher,
			distortion: distort,
			chorus: chorus,
		});
    
		setPitchShifter(pitchShift);
		setDistortionChannel(distortionChannel);
		setBitcrusherChannel(bitcrusherChannel);
		setChorusChannel(chorusChannel);
		setReverbChannel(reverbChannel);
		setPlayerChannel(playerChannel);

		playerChannel.send("distortion");
		playerChannel.send("bitcrusher");
		playerChannel.send("chorus");
		playerChannel.send("reverb");

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
					<div className="flex gap-20">
						<div className="flex gap-2 flex-wrap row-start-3 place-content-center border-4 p-4">
							<h1>Distortion</h1>
							<EffectToggleButton
								effectChannel={distortionChannel}
								name="Mute"
								isState={isDistorted}
								stateFn={setIsDistorted}
								connectFn={connectChannelEffect}
								muteFn={muteChannelEffect}
								channelName={"distortion"}
							/>
							<EffectSlider
								player={player}
								name={"Channel Send"}
								fn={setChannelVolume}
								min="-60"
								max="6"
								defaultValue="-60"
								step="0.1"
								effect={distortionChannel}
								setEffect={setDistortionChannel}
								stateEffect={effects}
							/>
						</div>
						<div className="flex gap-2 flex-wrap row-start-3 place-content-center">
							<h1>BitCrusher</h1>
							<EffectToggleButton
								effectChannel={bitcrusherChannel}
								name="Mute"
								isState={isBitcrushed}
								stateFn={setIsBitcrushed}
								connectFn={connectChannelEffect}
								muteFn={muteChannelEffect}
								channelName={"bitcrusher"}
							/>
							<EffectSlider
								player={player}
								name={"Channel Send"}
								fn={setChannelVolume}
								min="-60"
								max="6"
								defaultValue="-60"
								step="0.1"
								effect={bitcrusherChannel}
								setEffect={setBitcrusherChannel}
								stateEffect={effects}
							/>
						</div>
						<div className="flex gap-2 flex-wrap row-start-3 place-content-center">
							<h1>Chorus</h1>
							<EffectToggleButton
								effectChannel={chorusChannel}
								name="Mute"
								isState={isChorus}
								stateFn={setIsChorus}
								connectFn={connectChannelEffect}
								muteFn={muteChannelEffect}
								channelName={"chorus"}
							/>
							<EffectSlider
								player={player}
								name={"Channel Send"}
								fn={setChannelVolume}
								min="-60"
								max="6"
								defaultValue="-60"
								step="0.1"
								effect={chorusChannel}
								setEffect={setChorusChannel}
								stateEffect={effects}
							/>
						</div>
						<div className="flex gap-2 flex-wrap row-start-3 place-content-center">
							<h1>Reverb</h1>
							<EffectToggleButton
								effectChannel={reverbChannel}
								name="Mute"
								isState={isReverb}
								stateFn={setIsReverb}
								connectFn={connectChannelEffect}
								muteFn={muteChannelEffect}
								channelName={"reverb"}
							/>
							<EffectSlider
								player={player}
								name={"Channel Send"}
								fn={setChannelVolume}
								min="-60"
								max="6"
								defaultValue="-60"
								step="0.1"
								effect={reverbChannel}
								setEffect={setReverbChannel}
								stateEffect={effects}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
