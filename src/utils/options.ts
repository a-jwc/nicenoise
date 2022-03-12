import { FilterRollOff } from "tone";

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
