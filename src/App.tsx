import React, { useState } from "react";
import ReactModal from "react-modal";
import { Outlet, useOutletContext } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

ReactModal.setAppElement("#root");

export interface ContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Outlet context={{isLoggedIn, setIsLoggedIn}} />
		</>
	);
}

export function useIsLoggedIn() {
	return useOutletContext<ContextType>();
}

export default App;
