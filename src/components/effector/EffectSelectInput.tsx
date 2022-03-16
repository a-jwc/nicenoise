import {
	EffectOptionProp,
	EffectSelectInputProp,
} from "../../interfaces/interface";

export default function EffectSelectInput({
  name,
	setEffect,
	effect,
	options,
}: EffectSelectInputProp) {
	return (
		<label className="text-black">
			<p className="text-white">{name}</p>
			<select
				onChange={(e) => {
					setEffect(effect, e.target.value as OverSampleType);
				}}
			>
				{options.map((option: string) => (
					<option value={option}>{option}</option>
				))}
			</select>
		</label>
	);
}
