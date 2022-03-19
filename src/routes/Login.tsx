import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useIsLoggedIn } from "../App";

export const Login = () => {
	const [state, setState] = useState({
		username: "",
		password: "",
	});
	const { setIsLoggedIn } = useIsLoggedIn();
	const [error, setError] = useState("");

	let navigate = useNavigate();
	let location = useLocation();
	let from = location.pathname;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		let credentials = {
			username: data.get("username"),
			password: data.get("password"),
		};

		try {
			const res = await fetch("http://localhost:8000/api/v1/auth/login", {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
				credentials: "include",
			});
			if (!res.ok) throw Error("Could not fetch data");
			const data = await res.json();
			setIsLoggedIn(true);
			navigate("/", { replace: true });
		} catch (err) {
			setError("Invalid login.");
			throw err;
		} finally {
			console.log("Logged in");
		}
	};

	return (
		<Container>
			<main className="bg-white bg-opacity-10 min-w-fit pb-8 px-4 w-1/2 mx-auto drop-shadow-2xl">
				<h1 className="text-center text-2xl font-bold p-4 text-white">Login</h1>
				<div className="text-red-500 text-center">{error.length !== 0 ? `${error}` : ""}</div>
				<div className="mx-auto my-4">
					<form className="form" onSubmit={handleSubmit}>
						<label className="form-field">
							Username
							<input
								type="text"
								name="username"
								value={state.username}
								onChange={onChange}
								className="input-field"
							/>
						</label>
						<label className="form-field">
							Password
							<input
								type="password"
								name="password"
								value={state.password}
								onChange={onChange}
								className="input-field"
							/>
						</label>
						<input type="submit" value="Submit" className="submit text-white" />
					</form>
				</div>
				<NotRegistered />
			</main>
		</Container>
	);
};

const NotRegistered = () => {
	return (
		<div className="text-center mt-4 text-white">
			Don't have an account?{" "}
			<Link to="/register" className="hover:text-pink-300">
				Create an account
			</Link>
		</div>
	);
};
