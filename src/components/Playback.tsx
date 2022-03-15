import { useEffect, useState } from "react";

export default function Playback() {
	const [soundId, setSoundId] = useState(6);
	const [soundUrl, setSoundUrl] = useState("");

	// useEffect(() => {
	// 	setSoundUrl(`http://localhost:8000/api/v1/sounds/${soundId}`);
	// 	const getSound = async () => {
	// 		const res = await fetch(
	// 			`http://localhost:8000/api/v1/sounds/${soundId}`,
	// 			{
	// 				// headers: {
	// 				// 	Range: "bytes=0-",
	// 				// },
	// 			}
	// 		);
	// 	};
	// 	const getSoundInfo = async () => {
	// 		const res = await fetch(
	// 			`http://localhost:8000/api/v1/sounds/info/${soundId}`,
	// 			{
	// 				headers: {
	// 					Range: "bytes=0-",
	// 				},
	// 			}
	// 		);
	// 	};
	// 	getSound();
	// });

	return (
		<div className="object-contain m-auto">
			<audio controls className="object-contain m-auto">
				<source src={`http://localhost:8000/api/v1/sounds/${soundId}`} type="audio/mpeg" />
			</audio>
		</div>
	);
}
