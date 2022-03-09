import { PlayerButtonProp } from "../interfaces/interface";

export default function PlayerButton({ player, name, fn, styles }: PlayerButtonProp) {
	return (
		<div>
			<button
				type="button"
				onClick={() => fn(player)}
				className={`border-2 border-black p-1 hover:bg-red-300 ${styles}`}
			>
				{name}
			</button>
		</div>
	);
}