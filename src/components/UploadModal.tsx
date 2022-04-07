import { useState } from "react";
import { returnFileSize, validFileType } from "../utils/fileUpload";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface UploadModalProp {
	url: string;
	fileTypes: string[];
	modalTitle: string;
	modalButtonStyles: string;
	fileAccept: string;
	navigateUrl: string;
	modalButtonName: string;
}

export default function UploadModal({
	url,
	fileTypes,
	modalTitle,
	modalButtonStyles,
	fileAccept,
	navigateUrl,
	modalButtonName,
}: UploadModalProp) {
	const [file, setFile] = useState<File>();
	const [fileSize, setFileSize] = useState<string | undefined>("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [error, setError] = useState("");
	let navigate = useNavigate();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const file = event.target.files[0];
			console.log(file.type);
			if (validFileType(file, fileTypes)) {
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
			const res = await fetch(url, {
				method: "POST",
				mode: "cors",
				body: formData,
				credentials: "include",
			});
			if (res.status === 401) {
				setError("Please login or register to upload");
				throw Error("Unauthorized");
			}
			if (!res.ok) throw Error("Could not get upload");
			const data = await res.json();
			navigate(navigateUrl, { replace: true });
		} catch (e) {
			throw e;
		}
	};

	const handleDelete = async () => {
		try {
			const res = await fetch(
				"http://localhost:8000/api/v1/user/delete-avatar",
				{ method: "POST", mode: "cors", credentials: "include" }
			);
			if (res.status === 401) {
				setError("Please login or register to delete");
				throw Error("Unauthorized");
			}
			if (!res.ok) throw Error("Could not delete");
			const data = await res.json();
			navigate(navigateUrl, { replace: true });
		} catch (e) {
			throw e;
		}
	};

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<button onClick={openModal} className={modalButtonStyles}>
				{modalButtonName}
			</button>
			<ReactModal
				isOpen={modalIsOpen}
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
				<>
					<h1>{modalTitle}</h1>
					<div className="flex flex-col place-items-center">
						<button onClick={closeModal} className="absolute top-2 right-4">
							X
						</button>
						<form className="flex flex-col" onSubmit={handleSubmit}>
							<label className="flex flex-col place-self-center border-2 text-center w-20 h-10 hover:cursor-pointer">
								Upload
								<input
									type="file"
									accept={fileAccept}
									className="mt-2 opacity-0 hover:cursor-pointer"
									onChange={(e) => handleFileUpload(e)}
									required
								/>
							</label>
							<input
								type="submit"
								className="place-self-center w-16 h-8 bg-pink-300 m-4 text-white hover:cursor-pointer"
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
						<Button
							onClick={handleDelete}
							size="small"
							startIcon={<DeleteIcon />}
							color="error"
						>
							Delete image
						</Button>
						<div className="text-center text-red-500">
							{error.length !== 0 ? error : ""}
						</div>
					</div>
				</>
			</ReactModal>
		</>
	);
}
