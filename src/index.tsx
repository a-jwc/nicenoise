import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SoundBetter } from "./routes/SoundBetter";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import { Register } from "./components/Register";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Home />} />
					<Route path="better" element={<SoundBetter />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
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
