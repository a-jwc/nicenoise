import { FilterRollOff } from "tone";
import { EffectOptionProp } from "../interfaces/interface";

export const BiquadFilters: BiquadFilterType[] = [
	"lowpass",
	"highpass",
	"bandpass",
	"lowshelf",
	"highshelf",
	"notch",
	"allpass",
	"peaking",
];

export const FilterRollOffs: FilterRollOff[] = [-12, -24, -48, -96];

export const distortionOversample: string[] = ["none", "2x", "4x"];
