import { SliderProp } from "../../interfaces/interface";

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
		<div className=" text-white m-8">
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
          className="lg:-rotate-90"
				/>
			</label>
		</div>
	);
}
