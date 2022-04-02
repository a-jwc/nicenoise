import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Outlet, useOutletContext } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { sendRequest } from "./utils/fetch";

if (process.env.NODE_ENV !== "test") ReactModal.setAppElement("#root");

export interface ContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	username: string;
}

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		sendRequest("http://localhost:8000/api/v1/user/is-logged-in", "GET")
			.then((res) => res.json())
			.then((json) => {
				setUsername(json.username);
        setIsLoggedIn(json.status)
			})
			.catch((e) => {
				throw e;
			});
	}, []);

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Outlet context={{ isLoggedIn, setIsLoggedIn, username }} />
		</>
	);
}

export function useIsLoggedIn() {
	return useOutletContext<ContextType>();
}

export default App;
