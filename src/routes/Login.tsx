import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useIsLoggedIn } from "../App";
import FormTextInput from "../components/FormTextInput";
import { sendRequest } from "../utils/fetch";
import SubmitInput from "../components/elements/SubmitInput";

export const Login = () => {
	const [state, setState] = useState({
		username: "",
		password: "",
	});
	const { setIsLoggedIn } = useIsLoggedIn();
	const [error, setError] = useState("");

	let navigate = useNavigate();

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

		const res = await sendRequest(
			"http://localhost:8000/api/v1/auth/login",
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
				<h1 className="text-center text-2xl font-bold p-4 text-white">Login</h1>
				<div className="text-red-500 text-center">
					{error.length !== 0 ? `${error}` : ""}
				</div>
				<div className="mx-auto my-4">
					<form className="form" onSubmit={handleSubmit}>
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
						<SubmitInput bgColor="bg-red-300" textColor="text-white" />
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
