import { Dialog } from "@headlessui/react";
import { useState } from "react";

const ConfirmDialog = ({ handle }: { handle: () => Promise<void> }) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="fixed z-10 inset-44 overflow-y-auto"
		>
			<div className="relative bg-white rounded max-w-sm mx-auto">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
				<div className="relative bg-white rounded max-w-sm mx-auto p-4">
					<Dialog.Title>Delete Profile Image</Dialog.Title>
					<Dialog.Description className="text-sm text-neutral-400">
						This will permanently delete your profile image.
					</Dialog.Description>
					<p>Are you sure?</p>

					<button
						onClick={() => {
							handle();
							setIsOpen(false);
						}}
						className="red-button mr-4"
					>
						Delete
					</button>
					<button onClick={() => setIsOpen(false)} className="cancel-button">
						Cancel
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default ConfirmDialog;
