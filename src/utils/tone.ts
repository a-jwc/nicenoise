import * as Tone from "tone";

export async function getAudioBuffer(file: File) {
	if (file !== undefined) {
		const arrayBuffer = await file.arrayBuffer();
		const audioContext = new AudioContext();
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
		return audioBuffer;
	}
}

export async function createTone(file: File) {
	const audioBuffer = await getAudioBuffer(file);
	if (audioBuffer !== undefined) {
		const player = new Tone.Player(audioBuffer);
		return player;
	}
}
