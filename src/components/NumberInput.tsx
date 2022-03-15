import { NumberInputProp } from "../interfaces/interface";

export const NumberInput = ({
	name,
	min,
	max,
	step,
	defaultValue,
	setEffect,
	effect,
	styles,
}: NumberInputProp) => {
	return (
		<label className="text-white">
			{name}
			<input
				type={"number"}
				min={min}
				max={max}
				step={step}
				defaultValue={defaultValue}
				onChange={(e) => {
					setEffect(effect, parseFloat(e.target.value));
				}}
				className="text-right text-black"
			/>
		</label>
	);
};
