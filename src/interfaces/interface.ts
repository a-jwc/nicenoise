import * as Tone from "tone";

export interface PlayerContainer {
	player: Tone.Player;
}

export interface PlayerButtonProp {
	player: Tone.Player;
	name: string;
	fn: Function;
	styles?: string;
}

export interface ToggleButtonProp {
	player: Tone.Player;
	name: string;
	fn: Function;
	styles?: string;
	state?: any;
	stateFn?: Function;
}

export interface SliderProp {
	player: Tone.Player;
	name: string;
	fn: Function;
	value?: number;
	min?: string;
	max?: string;
	defaultValue?: string;
	step?: string;
}

export interface EffectSliderProp {
	player: Tone.Player;
	name: string;
	fn: Function;
	value: number;
}
