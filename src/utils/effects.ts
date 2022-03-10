import * as Tone from "tone";
import { FilterRollOff } from "tone";

const crossFade = new Tone.CrossFade().toDestination();

export function initEffects(player: Tone.Player) {
	const distort = new Tone.Distortion(1);
	const bitcrush = new Tone.BitCrusher(6);
	const chorus = new Tone.Chorus(4, 2.5, 0.5);

	return {
		distort,
		bitcrush,
		chorus,
	};
}

export function connectEffect(player: Tone.Player, effect: any) {
  player.chain(effect, Tone.Destination)
}

export function disconnectEffect(player: Tone.Player, effect: any) {
  player.disconnect(effect)
}

export function toggleEffect(player: Tone.Player, effect: any) {
  effect.wet.value === 0 ? (effect.wet.value = 1) : (effect.wet.value = 0);
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
