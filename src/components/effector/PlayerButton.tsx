import { PlayerButtonProp } from "../../interfaces/interface";

export default function PlayerButton({ player, name, fn, styles }: PlayerButtonProp) {
	return (
		<div>
			<button
				type="button"
				onClick={() => fn(player)}
				className={`border-2 p-1 text-white hover:bg-red-300 transition-colors ${styles}`}
			>
				{name}
			</button>
		</div>
	);
}