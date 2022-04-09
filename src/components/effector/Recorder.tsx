import { useState } from "react";
import * as Tone from "tone";

const Recorder = ({ recorder }: { recorder: Tone.Recorder }) => {
	const [isRecorded, setIsRecorded] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordingUrl, setRecordingUrl] = useState("");
	const [recording, setRecording] = useState("Record");
	return (
		<div>
			<label
				className={`flex flex-col place-self-center border-2 border-neutral-400 p-4 w-24 h-12 mx-auto text-center hover:cursor-pointer mb-12 hover:bg-red-300 transition-colors ${
					isRecording ? "bg-red-300" : "bg-blue-300"
				}`}
			>
				{recording}
				<input
					type={"submit"}
					value={recording}
					onClick={async (e) => {
						e.preventDefault();
						if (recorder.state === "stopped") {
							recorder.start();
							setRecording("Recording");
							setIsRecording(true);
						} else {
							const recording = await recorder.stop();
							const url = URL.createObjectURL(recording);
							setRecording("Record");
							setIsRecording(false);
							setIsRecorded(true);
							setRecordingUrl(url);
						}
					}}
					className="mt-2 opacity-0 hover:cursor-pointer"
				/>
			</label>
			<div className="text-center">
				{isRecorded && (
					<a
						href={`${recordingUrl}`}
						download="recording.webm"
						className="text-red-500"
					>
						Download
					</a>
				)}
			</div>
		</div>
	);
};

export default Recorder;
