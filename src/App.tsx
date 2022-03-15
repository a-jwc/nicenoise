import React from "react";
import ReactModal from "react-modal";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";

ReactModal.setAppElement("#root");

function App() {
	return (
		<div className="">
			<Navbar />
			<Outlet />
		</div>
	);
}

export default App;
