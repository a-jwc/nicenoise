import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useLogout from "../hooks/useLogout";
import UploadSound from "./UploadSound";

export default function Navbar({
	isLoggedIn,
	setIsLoggedIn,
}: {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { apiData } = useFetch<boolean>(
		"http://localhost:8000/api/v1/user/is-logged-in"
	);
	const { logout } = useLogout();

	useEffect(() => {
		if (apiData) setIsLoggedIn(apiData);
	}, [apiData, isLoggedIn, setIsLoggedIn]);

	return (
		<nav className="my-4 mx-8 border-b-2 object-contain pb-4">
			<ul className="navbar flex flex-row flex-wrap flex-shrink xs:gap-6 gap-2 text-white sm:place-content-start place-content-evenly object-contain font-bold">
				<li key={"Home"}>
					<Link to="/">Home</Link>
				</li>
				<li key={"Effector"}>
					<Link to="/effector">Effector</Link>
				</li>
				{isLoggedIn ? (
					[
						<li key={"Profile"}>
							<Link to="/profile">Profile</Link>
						</li>,
						<li key={"Logout"}>
							<Link
								to="/"
								onClick={async () => {
									logout();
									setIsLoggedIn(false);
								}}
							>
								Logout
							</Link>
						</li>,
					]
				) : (
					<li key={"Login"}>
						<Link to="/login">Login</Link>
					</li>
				)}
				<li key={"Upload"}>
					<UploadSound />
				</li>
			</ul>
		</nav>
	);
}
