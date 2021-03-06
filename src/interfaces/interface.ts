import * as Tone from "tone";
import { ReactNode } from "react";

// * General
export interface ChildrenProps {
	children: ReactNode;
}

// * Effector
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

export interface EffectOptionProp {
	value: string;
	name: string;
}

export interface EffectSelectInputProp {
	name: string;
	setEffect: Function;
	effect: any;
	options: any;
}

// * User
export interface Sound {
	id: number;
	title: string;
	published: boolean;
	authorName: string;
	authorId: number;
	sound: string;
	uploadDate: string;
	coverImage: string;
	likesCount: number;
}

export interface User {
	username: string;
	id: number;
	email: string;
	avatar: any;
	likes: Sound[];
	sounds: Sound[];
	followedBy: User[];
	following: User[];
}

export interface IsLoggedIn {
	status: boolean;
	username: string;
}
