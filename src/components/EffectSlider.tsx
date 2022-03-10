import { SliderProp } from "../interfaces/interface";

export function EffectSlider({
	player,
	name,
	fn,
	min,
	max,
	defaultValue,
	step,
}: SliderProp) {
	return (
		<div>
			<label>
				{name}
				<input
					type="range"
					min={min}
					max={max}
					defaultValue={defaultValue}
					step={step}
					onChange={(e) => {
						fn(player, parseFloat(e.target.value));
					}}
				/>
			</label>
		</div>
	);
}
