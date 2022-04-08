import { SliderProp } from "../../interfaces/interface";

export function VolumeSlider({
	player,
	name,
	fn,
	min,
	max,
	defaultValue,
	step,
	styles,
}: SliderProp) {
	return (
		<div className="flex lg:flex-row flex-col text-white m-8">
			<label htmlFor={name}>{name}</label>
			<input
				name={name}
				type="range"
				min={min}
				max={max}
				defaultValue={defaultValue}
				step={step}
				onChange={(e) => {
					fn(player, parseFloat(e.target.value));
				}}
				className="lg:-rotate-90"
			/>
		</div>
	);
}
