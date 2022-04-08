import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../App";
import Container from "../components/Container";
import FormTextInput from "../components/FormTextInput";
import SubmitInput from "../components/util/SubmitInput";
import { sendRequest } from "../utils/fetch";

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

		const res = await sendRequest(
			"http://localhost:8000/api/v1/auth/register",
			"POST",
			credentials
		);
		if (!res.ok) {
			setError("Invalid login.");
			return;
		} else {
			setIsLoggedIn(true);
			navigate("/", { replace: true });
			window.location.reload();
		}
	};

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
						<FormTextInput
							labelName="Email"
							name="email"
							value={state.email}
							onChange={onChange}
						/>
						<FormTextInput
							labelName="Username"
							name="username"
							value={state.username}
							onChange={onChange}
						/>
						<FormTextInput
							labelName="Password"
							name="password"
							value={state.password}
							onChange={onChange}
							type="password"
						/>
						<FormTextInput
							labelName="Confirm Password"
							name="confirmPassword"
							value={state.confirmPassword}
							onChange={onChange}
							type="password"
						/>
						<SubmitInput bgColor="bg-red-300" textColor="text-white" />
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
