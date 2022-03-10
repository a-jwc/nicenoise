import { EffectToggleButtonProp } from "../interfaces/interface";

export function EffectToggleButton({
	player,
	name,
	styles,
	isState,
	stateEffect,
	stateFn,
	connectFn,
	disconnectFn,
}: EffectToggleButtonProp) {
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					if (!isState) {
						console.log(`connecting ${name}`);
						connectFn(player, stateEffect);
					} else {
						console.log(`disconnecting ${name}`);
						disconnectFn(player, stateEffect);
					}
					if (stateFn !== undefined) {
						stateFn(!isState);
					}
				}}
				className={`border-2 border-black p-1 hover:bg-red-300 ${styles} ${
					isState ? "bg-red-300" : ""
				}`}
			>
				{name}
			</button>
		</div>
	);
}