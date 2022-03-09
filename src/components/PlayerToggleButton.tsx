import { ToggleButtonProp } from "../interfaces/interface";

export default function PlayerToggleButton({
	player,
	name,
	fn,
	styles,
	state,
	stateFn,
}: ToggleButtonProp) {
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					fn(player, state);
					if (stateFn !== undefined) {
						stateFn(!state);
						console.log(state);
					}
				}}
				className={`border-2 border-black p-1 hover:bg-red-300 ${styles} ${
					!state ? "bg-red-300" : ""
				}`}
			>
				{name}
			</button>
		</div>
	);
}