import * as Tone from "tone";

export function play(player: Tone.Player) {
	player.start();
}

export function stop(player: Tone.Player) {
	player.stop();
}

export function volume(player: Tone.Player, level: number) {
	player.volume.value = level;
}

export function loop(player: Tone.Player, loop: boolean) {
	player.loop = loop;
}
