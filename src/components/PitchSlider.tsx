import { PitchSliderProp } from "../interfaces/interface";

export function PitchSlider({
	shifter,
	name,
	fn,
	min,
	max,
	defaultValue,
	step,
  styles
}: PitchSliderProp) {
	return (
		<div className="p-4">
			<label>
				{name}
				<input
					type="range"
					min={min}
					max={max}
					defaultValue={defaultValue}
					step={step}
					onChange={(e) => {
						fn(shifter, parseInt(e.target.value));
					}}
          className="-rotate-90"
				/>
			</label>
		</div>
	);
}
