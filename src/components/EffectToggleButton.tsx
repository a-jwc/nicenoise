import { useState } from "react";
import { EffectToggleButtonProp } from "../interfaces/interface";

export function EffectToggleButton({
	name,
	styles,
	effect,
  toggleFn
}: EffectToggleButtonProp) {
  const [mute, setMute] = useState(true);
	return (
		<div>
			<button
				type="button"
				onClick={() => {
          toggleFn(effect);
          setMute(!mute);
				}}
				className={`border-2 border-black p-1 hover:bg-red-300 w-24 ${styles} ${
					mute ? "bg-red-300" : "bg-blue-300"
				}`}
			>
				{mute ? "Mute" : "Unmute"}
			</button>
		</div>
	);
}
