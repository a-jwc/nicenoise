import * as Tone from "tone";
import { FilterRollOff } from "tone";

export function initEffects(player: Tone.Player) {
	const distortion = new Tone.Distortion(0).toDestination();
	const bitcrusher = new Tone.BitCrusher(6).toDestination();
	const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();
	const reverb = new Tone.Reverb().toDestination();
	const filter = new Tone.Filter(5000, "lowpass", -96).toDestination();

	const reverbChannel = new Tone.Channel({ volume: -60 }).connect(reverb);
	reverbChannel.receive("reverb");

	// const pitchShift = new Tone.PitchShift().toDestination();

	return {
		reverbChannel,
		distortion,
		bitcrusher,
		chorus,
		reverb,
		filter,
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

export function toggleEffect(effect: any) {
	effect.wet.value === 0 ? (effect.wet.value = 1) : (effect.wet.value = 0);
}

export function setChannelVolume(amount: number, channel: Tone.Channel) {
	channel.volume.value = amount;
}

export function setDistortionAmount(
	distortion: Tone.Distortion,
	amount: number
) {
	distortion.distortion = amount;
}

export function setDistortionOversample(
	distortion: Tone.Distortion,
	amount: OverSampleType
) {
	distortion.set({ oversample: amount });
}

export function setBitcrusherAmount(
	bitcrusher: Tone.BitCrusher,
	amount: number
) {
	bitcrusher.set({ bits: amount });
}

export function updatePitchShift(pitchShift: Tone.PitchShift, amount: number) {
	pitchShift.pitch = amount;
}

export function setReverbDecay(reverb: Tone.Reverb, amount: number) {
	reverb.decay = amount;
}

export function setReverbPreDelay(reverb: Tone.Reverb, amount: number) {
	reverb.preDelay = amount;
}

export function setChorusDepth(chorus: Tone.Chorus, amount: number) {
	chorus.depth = amount;
}

export function setChorusFrequency(
	chorus: Tone.Chorus,
	amount: Tone.Unit.Frequency
) {
	chorus.set({ frequency: amount });
}

export function setChorusFeedback(chorus: Tone.Chorus, amount: number) {
	chorus.set({ feedback: amount });
}

export function setChorusDelay(chorus: Tone.Chorus, amount: number) {
	chorus.delayTime = amount;
}

export function connectFilter(player: Tone.Player, filter: Tone.Filter) {
	player.connect(filter);
}

export function disconnectFilter(player: Tone.Player, filter: Tone.Filter) {
	player.disconnect(filter);
}

export function setFilterFrequency(filter: Tone.Filter, frequency: number) {
	filter.set({ frequency: frequency });
}

export function setFilterRolloff(filter: Tone.Filter, rolloff: FilterRollOff) {
	filter.set({ rolloff: rolloff });
}

export function setFilterType(filter: Tone.Filter, type: BiquadFilterType) {
	filter.set({ type });
}
