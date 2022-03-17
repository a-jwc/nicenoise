import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";

interface targetProp {
	target: {
		value: string;
	};
}

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [credentials, setCredentials] = useState({});
	let navigate = useNavigate();
	let location = useLocation();
	let from = location.pathname;

	const onUsernameChange = ({ target: { value } }: targetProp) => {
		setUsername(value);
	};

	const onPasswordChange = ({ target: { value } }: targetProp) => {
		setPassword(value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		let credentials = {
			username: data.get("username"),
			password: data.get("password"),
		};
		setCredentials(credentials);

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
			navigate("/", { replace: true });
		} catch (err) {
			console.error(err);
			throw Error("Error");
		} finally {
			console.log("Logged in");
		}
	};

	return (
		<Container>
			<main>
				<h1 className="text-center text-2xl font-bold p-4 text-white">Login</h1>
				<div className="mx-auto my-4">
					<form className="form" onSubmit={handleSubmit}>
						<label className="form-field">
							Username
							<input
								type="text"
								name="username"
								value={username}
								onChange={onUsernameChange}
								className="input-field"
							/>
						</label>
						<label className="form-field">
							Password
							<input
								type="password"
								name="password"
								value={password}
								onChange={onPasswordChange}
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
			Don't have an account? <Link to="/register">Create an account</Link>
		</div>
	);
};
