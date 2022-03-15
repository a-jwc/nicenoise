import { EffectSliderProp } from "../../interfaces/interface";

export function EffectSlider({
	player,
	name,
	fn,
	min,
	max,
	defaultValue,
	step,
	styles,
	effect,
	setEffect,
	stateEffect,
}: EffectSliderProp) {
	return (
		<div className="text-center">
			<label>
				<input
					type="range"
					min={min}
					max={max}
					defaultValue={defaultValue}
					step={step}
					onChange={(e) => {
						fn(parseFloat(e.target.value), effect);
					}}
				/>
				{name}
			</label>
		</div>
	);
}
