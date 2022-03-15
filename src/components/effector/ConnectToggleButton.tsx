import { useState } from "react";
import { ConnectToggleButtonProp } from "../../interfaces/interface";

export function ConnectToggleButton({
	player,
	name,
	styles,
	effect,
	connectFn,
	disconnectFn,
}: ConnectToggleButtonProp) {
	const [connect, setConnect] = useState(false);
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					if (!connect) {
						connectFn(player, effect);
					} else {
						disconnectFn(player, effect);
					}
					setConnect(!connect);
				}}
				className={`border-2 text-white p-1 w-24 transition-colors ${styles} ${
					connect ? "bg-red-300" : "bg-blue-300"
				}`}
			>
				{connect ? "Disconnect" : "Connect"}
			</button>
		</div>
	);
}
