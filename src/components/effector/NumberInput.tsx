import { NumberInputProp } from "../../interfaces/interface";

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
		<label className="text-white flex flex-col items-center p-1">
			{name}
      <br/>
			<input
				type={"number"}
				min={min}
				max={max}
				step={step}
				defaultValue={defaultValue}
				onChange={(e) => {
					setEffect(effect, parseFloat(e.target.value));
				}}
				className="text-right text-black p-1"
			/>
		</label>
	);
};
