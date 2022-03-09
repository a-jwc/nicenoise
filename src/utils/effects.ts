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

export function connectBitcrusher(
  player: Tone.Player,
  crusher: Tone.BitCrusher
) {
  player.connect(crusher);
}

export function disconnectBitcrusher(
  player: Tone.Player,
  crusher: Tone.BitCrusher
) {
  player.disconnect(crusher);
}

export function toggleBitcrusher(
  player: Tone.Player,
  crusher: Tone.BitCrusher
) {
  crusher.wet.value === 0 ? (crusher.wet.value = 1) : (crusher.wet.value = 0);
}

export function distortion(player: Tone.Player, amount: number) {
	player.connect(crossFade.a).toDestination();
	crossFade.fade.value = amount;
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
