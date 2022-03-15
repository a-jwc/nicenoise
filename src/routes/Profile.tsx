import { useEffect, useState } from "react";
import Container from "../components/Container";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/interface";

export default function Profile() {
	const { isLoading, apiData, error } = useFetch(
		"http://localhost:8000/api/v1/user/profile"
	);
	// const [username, setUsername] = useState("");
	// if (apiData !== undefined) {
  //   const data: User = apiData;
	// 	setUsername(data.username);
	// }
	return (
		<Container>
			<h1 className="text-white">Profile</h1>
			{isLoading && <span className="text-white">Loading...</span>}
			{!isLoading && error ? (
				<span className="text-white">Error</span>
			) : (
				<span className="text-white">{JSON.stringify(apiData)}</span>
			)}
		</Container>
	);
}
