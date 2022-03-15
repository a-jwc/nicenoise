import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";

interface targetProp {
	target: {
		value: string;
	};
}

export const Register = () => {
	const [state, setState] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	let navigate = useNavigate();
	let location = useLocation();
	let from = location.pathname;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		let credentials = {
			email: data.get("email"),
			username: data.get("username"),
			password: data.get("password"),
		};

		console.log(credentials);

		if (state.password !== state.confirmPassword) {
			alert("Passwords do not match");
			throw Error("Passwords do not match");
		}

		fetch("http://localhost:8000/api/v1/auth/register", {
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
			credentials: "include",
		})
			.then((resp) => {
				if (!resp.ok) {
					throw Error("Could not fetch data");
				}
				return resp.json();
			})
			.then((res) => {
				console.log(res);
				if (res.success === true) {
					console.log("Login successful");
					navigate("/", { replace: true });
				}
			})
			.catch((err) => {
				throw Error("Error:", err);
			});
	};

	return (
		<Container>
			<main>
				<h1 className="text-center text-2xl font-bold p-4 text-white">Register</h1>
				<div className="mx-auto my-4">
					<form className="form" onSubmit={handleSubmit}>
						<label className="form-field">
							Email
							<input
								type="text"
								name="email"
								value={state.email}
								onChange={onChange}
								className="input-field"
								required
							/>
						</label>
						<label className="form-field">
							Username
							<input
								type="text"
								name="username"
								value={state.username}
								onChange={onChange}
								className="input-field"
								required
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
								required
							/>
						</label>
						<label className="form-field">
							Confirm Password
							<input
								type="password"
								name="confirmPassword"
								value={state.confirmPassword}
								onChange={onChange}
								className="input-field"
								required
							/>
						</label>
						<input type="submit" value="Submit" className="submit" />
					</form>
				</div>
				<Registered />
			</main>
		</Container>
	);
};

const Registered = () => {
	return (
		<div className="text-center mt-4 text-white">
			Already have an account? <Link to="/login">Login</Link>
		</div>
	);
};
