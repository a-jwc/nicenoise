import { ChannelEffectToggleButtonProp } from "../interfaces/interface";

export function EffectToggleButton({
	effectChannel,
	name,
	styles,
	isState,
	stateEffect,
	stateFn,
	connectFn,
	muteFn,
	channelName,
}: ChannelEffectToggleButtonProp) {
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					// if (!isState) {
					// 	console.log(`connecting ${name}`);
					// 	connectFn(effectChannel, channelName);
					// } else {
					// 	console.log(`disconnecting ${name}`);
					// 	muteFn(effectChannel, channelName, isState);
					// }
					muteFn(effectChannel, isState);

					if (stateFn !== undefined) {
						stateFn(!isState);
					}
				}}
				className={`border-2 border-black p-1 hover:bg-red-300 w-24 ${styles} ${
					isState ? "bg-red-300" : ""
				}`}
			>
				{isState ? name: "Unmute"}
			</button>
		</div>
	);
}
