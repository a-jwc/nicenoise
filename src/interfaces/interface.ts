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
	connectFn?: Function;
	disconnectFn?: Function;
}

export interface EffectToggleButtonProp {
	player: Tone.Player;
	name?: string;
	styles?: string;
	isState: boolean;
  stateEffect: any;
	stateFn?: Function;
	connectFn: Function;
	disconnectFn: Function;
}

export interface ChannelEffectToggleButtonProp {
	effectChannel: any;
	name: string;
	styles?: string;
	isState: boolean;
  stateEffect?: any;
	stateFn?: Function;
	connectFn: Function;
	muteFn: Function;
  channelName: string;
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
  styles?: string;
}

export interface EffectSliderProp {
	player: Tone.Player;
	name?: string;
	fn: Function;
	value?: number;
	min?: string;
	max?: string;
	defaultValue?: string;
	step?: string;
  styles?: string;
  effect: any;
  setEffect: Function;
  stateEffect: any;
}

export interface PitchSliderProp {
	shifter: Tone.PitchShift;
	name: string;
	fn: Function;
	value?: number;
	min?: string;
	max?: string;
	defaultValue?: string;
	step?: string;
  styles?: string;
}