import { useEffect, useState } from "react";

import Container from "../components/Container";
import FormTextInput from "../components/FormTextInput";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/interface";
import { sendRequest } from "../utils/fetch";

const Settings = () => {
	const { apiData } = useFetch<User>(
		"http://localhost:8000/api/v1/user/profile"
	);
	const [state, setState] = useState({
		username: "",
		password: "",
		email: "",
		currUsername: "",
		currEmail: "",
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			state.currUsername === state.username &&
			state.currEmail === state.email
		) {
			alert("No information has changed");
			return;
		}
		const data = new FormData(event.currentTarget);
		const payload = {
			username: data.get("username"),
			email: data.get("email"),
		};
		await sendRequest(
			"http://localhost:8000/api/v1/user/update-user",
			"PUT",
			payload
		);
	};

	useEffect(() => {
		if (apiData) {
			setState({
				...state,
				username: apiData.username,
				email: apiData.email,
				currUsername: apiData.username,
				currEmail: apiData.email,
			});
		}
	}, [apiData]);

	return (
		<Container>
			<h1 className="text-white text-2xl">Settings</h1>
			<main className="bg-white bg-opacity-10 min-w-fit pb-8 px-4 w-1/2 mx-auto drop-shadow-2xl">
				<div className="mx-auto my-4">
					<h2 className="text-white font-bold mb-4">
						Update Account Information
					</h2>
					<form className="form" onSubmit={handleSubmit}>
						<FormTextInput
							labelName="Username"
							name="username"
							value={state.username}
							onChange={onChange}
						/>
						<FormTextInput
							labelName="Email"
							name="email"
							value={state.email}
							onChange={onChange}
						/>
						<input type="submit" value="Submit" className="submit text-white" />
					</form>
				</div>
			</main>
		</Container>
	);
};

export default Settings;
