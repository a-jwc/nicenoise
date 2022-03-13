import * as Tone from "tone";
import { ReactNode } from "react";

export interface ChildrenProps {
	children: ReactNode;
}

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

export interface ConnectToggleButtonProp {
	player: Tone.Player;
	name: string;
	fn?: Function;
	styles?: string;
	effect: any;
	stateFn?: Function;
	connectFn: Function;
	disconnectFn: Function;
}

export interface EffectToggleButtonProp {
	name?: string;
	styles?: string;
	effect: any;
	toggleFn: Function;
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

export interface NumberInputProp {
	name: string;
	min: string;
	max: string;
	step: string;
	defaultValue: string;
	setEffect: Function;
	effect: any;
	styles?: string;
}
