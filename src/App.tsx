import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./routes/Home";

function App() {
	return (
		<div className="">
      <Navbar />
      <Outlet />
		</div>
	);
}

export default App;
