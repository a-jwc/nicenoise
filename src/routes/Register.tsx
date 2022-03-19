import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../App";
import Container from "../components/Container";

export const Register = () => {
	const [state, setState] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const { setIsLoggedIn } = useIsLoggedIn();

	let navigate = useNavigate();
	let location = useLocation();
	let from = location.pathname;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		let credentials = {
			email: data.get("email"),
			username: data.get("username"),
			password: data.get("password"),
		};

		if (state.password !== state.confirmPassword) {
			alert("Passwords do not match");
			throw Error("Passwords do not match");
		}

		try {
			const res = await fetch("http://localhost:8000/api/v1/auth/register", {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
				credentials: "include",
			});
			if (!res.ok) {
        const json = await res.json()
				throw Error(json.message);
			}
			const data = await res.json();
			setIsLoggedIn(true);
			navigate("/", { replace: true });
		} catch (err) {
			setError(err as string);
			throw err;
		} finally {
			console.log("Registration successful");
		}
	};

	// TODO: add error
	return (
		<Container>
			<main className="bg-white bg-opacity-10 min-w-fit pb-8 px-4 w-1/2 mx-auto drop-shadow-2xl">
				<h1 className="text-center text-2xl font-bold p-4 text-white">
					Register
				</h1>
				<div className="text-red-500 text-center">
					{error.length !== 0 ? `${error}` : ""}
				</div>
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
			Already have an account?{" "}
			<Link to="/login" className="hover:text-pink-300">
				Login
			</Link>
		</div>
	);
};
