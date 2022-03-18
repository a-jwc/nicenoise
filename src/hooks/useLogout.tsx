import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
	let navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logout = async () => {
		try {
			const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			if (!res.ok) throw Error("Could not fetch data");
			const data = await res.json();
			navigate("/", { replace: true });
		} catch (err) {
			console.error(err);
			throw Error("Error");
		} finally {
			console.log("Logged out");
			setIsLoggedIn(false);
		}
	};

	return { isLoggedIn, setIsLoggedIn, logout };
}
