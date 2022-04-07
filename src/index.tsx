import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Effector } from "./routes/Effector";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import { Register } from "./routes/Register";
import Profile from "./routes/Profile";
import Settings from "./routes/Settings";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Home />} />
					<Route path="effector" element={<Effector />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path=":username" element={<Profile />} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
