import { useState } from "react";
import { returnFileSize, validFileType } from "../utils/fileUpload";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function UploadSound() {
	const [file, setFile] = useState<File>();
	const [fileSize, setFileSize] = useState<string | undefined>("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
  let navigate = useNavigate();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const file = event.target.files[0];
			if (validFileType(file)) {
				setFile(file);
				setFileSize(returnFileSize(file.size));
			} else {
				throw Error("invalid file type");
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file === undefined) throw Error("file is undefined");
		const formData = new FormData();
		formData.append("file", file);
		try {
			const res = await fetch("http://localhost:8000/api/v1/sounds/upload", {
				method: "POST",
				mode: "cors",
				body: formData,
				credentials: "include",
			});
			const data = await res.json();
			console.log(data);
			navigate("/", { replace: true });
		} catch (err) {
			throw new Error("Error uploading");
		}
	};

	const openModal = () => {
		setModalIsOpen(true);
	};

	const afterOpenModal = () => {};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<button onClick={openModal} className="font-bold">
				Upload
			</button>
			<ReactModal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				contentLabel="Upload"
				style={{
					content: {
						maxHeight: "50%",
						maxWidth: "50%",
						margin: "auto",
					},
				}}
			>
				<div className="">
					<h1>Upload a sound</h1>
					<button onClick={closeModal} className="absolute top-2 right-4">
						X
					</button>
					<form className="flex flex-col" onSubmit={handleSubmit}>
						<label className="flex flex-col place-self-center p-4 w-20 h-16 text-center hover:cursor-pointer">
							Upload
							<input
								type="file"
								accept="audio/*"
								className="mt-2 opacity-0 hover:cursor-pointer"
								onChange={(e) => handleFileUpload(e)}
								required
							/>
						</label>
						<input
							type="submit"
							className="place-self-center w-16 h-8 bg-red-500 m-4 text-white hover:cursor-pointer"
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
				</div>
			</ReactModal>
		</>
	);
}
