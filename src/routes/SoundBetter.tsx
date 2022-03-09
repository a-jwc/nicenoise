import { useState } from "react";
import Container from "../components/Container";
import Player from "../components/Player";
import { validFileType, returnFileSize } from "../utils/fileUpload";
import { createTone } from "../utils/tone";
import * as Tone from "tone";

export const SoundBetter = () => {
	const [file, setFile] = useState<File>();
	const [fileSize, setFileSize] = useState<string | undefined>("");
	const [state, setState] = useState({
		isSubmitted: false,
		player: new Tone.Player(),
	});

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const file = event.target.files[0];
			if (validFileType(file)) {
				setFile(file);
				setFileSize(returnFileSize(file.size));
			} else {
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(file);
		if (file === undefined) {
			throw Error("file is undefined");
		}
		const tone = await createTone(file);
		tone !== undefined
			? setState({ player: tone, isSubmitted: true })
			: console.log("tone undefined");
    console.log(tone)
	};

	return (
		<Container>
			<div className="bg-eggshell">
				<h1 className="text-center text-2xl font-bold p-4">Sound Better</h1>
				<div className="h-screen p-4 mx-auto">
					<form className="flex flex-col" onSubmit={handleSubmit}>
						<label className="flex flex-col place-self-center border-2 border-neutral-400 p-4 text-center">
							Upload
							<input
								type="file"
								accept="audio/mp3, audio/wav"
								className="mt-2 opacity-0"
								onChange={(e) => handleFileUpload(e)}
							/>
						</label>
						<input
							type="submit"
							className="place-self-center w-16 h-8 bg-red-500 m-4 rounded-lg"
						/>
					<div className="flex flex-row gap-4 mx-auto">
						<div>
							{file?.name.length !== undefined
								? `File name: ${file?.name}`
								: ""}
						</div>
						<div>{fileSize !== "" ? `File size: ${fileSize}` : ""}</div>
					</div>
					</form>
					<div>{state.isSubmitted && <Player player={state.player} />}</div>
				</div>
			</div>
		</Container>
	);
};
