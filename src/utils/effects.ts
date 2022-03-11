import * as Tone from "tone";
import { FilterRollOff } from "tone";

export function initEffects(player: Tone.Player) {
	const distort = new Tone.Distortion().toDestination();
	const distortionChannel = new Tone.Channel({ volume: -60 }).connect(distort);
	distortionChannel.receive("distortion");

	const bitcrusher = new Tone.BitCrusher(6).toDestination();
	const bitcrusherChannel = new Tone.Channel({ volume: -60 }).connect(bitcrusher);
	bitcrusherChannel.receive("bitcrusher");

	const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();
	const chorusChannel = new Tone.Channel({ volume: -60 }).connect(chorus);
	chorusChannel.receive("chorus");

	const reverb = new Tone.Reverb().toDestination();
  const reverbChannel = new Tone.Channel({ volume: -60 }).connect(reverb);
	reverbChannel.receive("reverb");

	const pitchShift = new Tone.PitchShift().toDestination();

	return {
		distortionChannel,
		bitcrusherChannel,
		chorusChannel,
    reverbChannel,
		distort,
		bitcrusher,
		chorus,
		// jcReverb,
		pitchShift,
	};
}

export function connectChannelEffect(
	playerChannel: Tone.Channel,
	effectChannelName: string
) {
	// player.chain(effect, Tone.Destination);
	playerChannel.send(effectChannelName);
}

export function muteChannelEffect(
	effectChannel: Tone.Channel,
  effectState: boolean
) {
  effectChannel.mute = effectState;
}

export function toggleEffect(player: Tone.Player, effect: any) {
	effect.wet.value === 0 ? (effect.wet.value = 1) : (effect.wet.value = 0);
}

export function setChannelVolume(
	amount: number,
	channel: Tone.Channel
) {
	channel.volume.value = amount;
}

export function updatePitchShift(pitchShift: Tone.PitchShift, amount: number) {
	pitchShift.pitch = amount;
}

export function filter(
	player: Tone.Player,
	freq: Tone.Unit.Frequency,
	type?: BiquadFilterType,
	rolloff?: FilterRollOff
) {
	const filter = new Tone.Filter(10000, "highpass");
	console.log(filter);
	player.chain(filter, Tone.Destination);
}
