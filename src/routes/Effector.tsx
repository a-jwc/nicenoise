import { useState } from "react";
import Container from "../components/Container";
import Player from "../components/effector/TonePlayer";
import { validFileType, returnFileSize } from "../utils/fileUpload";
import { createTone } from "../utils/tone";
import * as Tone from "tone";
import SubmitInput from "../components/elements/SubmitInput";

export const Effector = () => {
	const [file, setFile] = useState<File>();
	const [fileSize, setFileSize] = useState<string | undefined>("");
	const [state, setState] = useState({
		isSubmitted: false,
		player: new Tone.Player(),
	});

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const file = event.target.files[0];
			if (validFileType(file, ["audio/mpeg", "audio/wav"])) {
				setFile(file);
				setFileSize(returnFileSize(file.size));
			} else {
				throw Error("invalid file type");
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file === undefined) {
			throw Error("file is undefined");
		}
		const tone = await createTone(file);
		tone !== undefined
			? setState({ player: tone, isSubmitted: true })
			: console.error("tone undefined");
	};

	return (
		<Container>
			<div className="bg-white bg-opacity-10 max-w-fit mx-auto object-contain">
				<h1 className="text-center text-2xl font-bold p-4 text-white">
					Effector
				</h1>
				<div className="h-max p-4 mx-auto">
					<form className="flex flex-col" onSubmit={handleSubmit}>
						<label className="flex flex-col place-self-center border-2 p-4 w-48 mx-12 text-center text-white hover:cursor-pointer">
							Upload
							<input
								type="file"
								accept="audio/*"
								className="mt-2 opacity-0 hover:cursor-pointer"
								onChange={(e) => handleFileUpload(e)}
								required
							/>
						</label>
            <SubmitInput bgColor="bg-red-300" textColor="text-white" styles="place-self-center mb-2" />
						<div className="flex flex-row gap-4 mx-auto text-white">
							<div>
								{file?.name.length !== undefined
									? `File name: ${file?.name}`
									: ""}
							</div>
							<div>{fileSize !== "" ? `File size: ${fileSize}` : ""}</div>
						</div>
					</form>
					{state.isSubmitted && <Player player={state.player} />}
				</div>
			</div>
		</Container>
	);
};
