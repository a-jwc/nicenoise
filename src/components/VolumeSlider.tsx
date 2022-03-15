import { SliderProp } from "../interfaces/interface";

export function VolumeSlider({
	player,
	name,
	fn,
	min,
	max,
	defaultValue,
	step,
  styles
}: SliderProp) {
	return (
		<div className="p-4 text-white">
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
          className="-rotate-90"
				/>
			</label>
		</div>
	);
}
