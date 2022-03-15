import { useEffect } from "react";
import Container from "../components/Container";
import useFetch from "../hooks/useFetch";

export default function Profile() {
	const { isLoading, apiData, error } = useFetch(
		"http://localhost:8000/api/v1/user/profile"
	);

	return (
		<Container>
			<h1>Profile</h1>
			{isLoading && <span>Loading...</span>}
			{!isLoading && error ? (
				<span>Error</span>
			) : (
				<span>{JSON.stringify(apiData)}</span>
			)}
		</Container>
	);
}
