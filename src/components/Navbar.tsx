import { useEffect } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useLogout from "../hooks/useLogout";
import Dropdown from "./Dropdown";
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
		<nav className="flex px-8 py-4 text-white object-contain border-b-neutral-100 bg-black bg-opacity-5 drop-shadow-2xl">
			<ul className="navbar flex flex-row flex-wrap flex-grow xs:gap-6 gap-2 sm:place-content-start place-content-evenly object-contain font-bold w-1/2">
				<li key={"Home"}>
					<Link to="/" className="text-pink-200">
						nicenoise.io
					</Link>
				</li>
				<li key={"Effector"}>
					<Link to="/effector">effector</Link>
				</li>
				{isLoggedIn ? (
					[
						<li key={"Profile"}>
							<Link to="/profile">profile</Link>
						</li>,
						<li key={"Logout"}>
							<Link
								to="/"
								onClick={async () => {
									logout();
									setIsLoggedIn(false);
								}}
							>
								logout
							</Link>
						</li>,
						<li key={"Settings"}>
							<Link to="/settings" style={{ display: "flex" }}>
								settings
							</Link>
						</li>,
					]
				) : (
					<li key={"Login"}>
						<Link to="/login">login</Link>
					</li>
				)}
				<li key={"Upload"}>
					<UploadSound />
				</li>
			</ul>
			{/* <ul className="navbar flex justify-end flex-wrap flex-shrink xs:gap-6 gap-2 place-content-end object-contain font-bold w-1/2 ">
				<li key={"Upload"}>
					<UploadSound />
				</li>
				<Dropdown isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			</ul> */}
		</nav>
	);
}
